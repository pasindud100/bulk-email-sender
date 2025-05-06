package com.bulk_email_sender.email_service.services;

import com.bulk_email_sender.email_service.dto.StudentDto;
import com.bulk_email_sender.email_service.entity.Email;
import com.bulk_email_sender.email_service.repository.EmailRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import jakarta.mail.internet.MimeMessage;

import java.util.List;

@Service
public class EmailService {

    //inject the JavaMailSender bean
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private EmailRepository emailRepository;

    //REST client to make HTTP calls
    private RestTemplate restTemplate = new RestTemplate();

    private String STUDENT_SERVICE_URL = "http://localhost:8080/api/v1/students";

    //objectMapper to convert JSON strings to Java objects
    private ObjectMapper objectMapper = new ObjectMapper();

    public void sendBulkEmails(String subject, String htmlBody) {
        try {
            // Make a get request to the student service to fetch all students
            ResponseEntity<String> response = restTemplate.exchange(
                    STUDENT_SERVICE_URL,
                    HttpMethod.GET,
                    null,
                    String.class);

            // convert JSON response into studentDto objects
            List<StudentDto> students = objectMapper.readValue(response.getBody(), new TypeReference<List<StudentDto>>() {
            });

            //send email to each student using their email and first name
            for (StudentDto student : students) {
                sendEmail(student.getEmail(), student.getFirstName(), subject, htmlBody);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

 //Sends email and logs the result in the database.
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

            // Save a successful email record to the database
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