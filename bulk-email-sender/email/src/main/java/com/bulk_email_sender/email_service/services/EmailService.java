package com.bulk_email_sender.email_service.services;

import com.bulk_email_sender.email_service.dto.StudentDto;
import com.bulk_email_sender.email_service.entity.Email;
import com.bulk_email_sender.email_service.repository.EmailRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import jakarta.mail.internet.MimeMessage;
import java.util.List;

@Service
public class EmailService {

    private final WebClient webClient;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private EmailRepository emailRepository;

    // ObjectMapper to convert JSON strings to Java objects
    private ObjectMapper objectMapper = new ObjectMapper();

    public EmailService(WebClient webClient) {
        this.webClient = webClient;
    }

    public void sendBulkEmails(String subject, String htmlBody) {
        //request to student service to get all students
        webClient.get()
                .uri("/api/v1/students") // specified the base url inside ebClient configuration file
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(responseBody -> {
                    try{
                        //this convert json response into StudentDto objects
                        List<StudentDto> students = objectMapper.readValue(responseBody, new TypeReference<List<StudentDto>>() {});
                        //Send email to each student using their email and first name
                        for (StudentDto student : students) {
                            sendEmail(student.getEmail(), student.getFirstName(), subject, htmlBody);
                        }
                    } catch(Exception e){
                        e.printStackTrace();
                    }
                    return Mono.empty();
                })
                .subscribe(); // this to the Mono to trigger the request..
    }

    // Sends email and logs the result in the database.
    private void sendEmail(String toEmail, String recipientName, String subject, String rawHtml) {
        try {
            // Create a new mime email message
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            // Set email recipient and subject
            helper.setTo(toEmail);
            helper.setSubject(subject);

            String personalizedBody = rawHtml.replace("{name}", recipientName);
            helper.setText(personalizedBody, true);

            mailSender.send(message);

            // Save a successful email msg
            Email emailRecord = new Email(toEmail, subject, personalizedBody, "SENT");
            emailRepository.save(emailRecord);
        } catch (Exception e) {
            // Log any sending error and save the failed attempt
            e.printStackTrace();
            Email emailRecord = new Email(toEmail, subject, rawHtml, "FAILED");
            emailRepository.save(emailRecord);
        }
    }
}