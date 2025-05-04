package com.bulk_email_sender.email_service.services;

import com.bulk_email_sender.email_service.dto.StudentDto;
import com.bulk_email_sender.email_service.entity.Email; // Your Email entity
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

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private EmailRepository emailRepository;

    private RestTemplate restTemplate = new RestTemplate();

    private String STUDENT_SERVICE_URL = "http://localhost:8080/api/v1/students";

    private ObjectMapper objectMapper = new ObjectMapper();

    public void sendBulkEmails(String subject, String htmlBody) {
        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    STUDENT_SERVICE_URL,
                    HttpMethod.GET,
                    null,
                    String.class);

            List<StudentDto> students = objectMapper.readValue(response.getBody(), new TypeReference<List<StudentDto>>() {});
            for (StudentDto student : students) {
                sendEmail(student.getEmail(), student.getFirstName(), subject, htmlBody);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void sendEmail(String toEmail, String recipientName, String subject, String rawHtml) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(toEmail);
            helper.setSubject(subject);

            // Replace placeholder {name} in email body
            String personalizedBody = rawHtml.replace("{name}", recipientName);
            helper.setText(personalizedBody, true);

            mailSender.send(message);

            Email emailRecord = new Email(toEmail, subject, personalizedBody, "SENT");
            emailRepository.save(emailRecord);
        } catch (Exception e) {
            e.printStackTrace();
            Email emailRecord = new Email(toEmail, subject, rawHtml, "FAILED");
            emailRepository.save(emailRecord);
        }
    }

    public List<Email> getAllEmails() {
        return emailRepository.findAll();
    }

    public Email getEmailById(Long id) {
        return emailRepository.findById(id)
                .orElse(null);
    }

    public void deleteEmail(Long id) {
        emailRepository.deleteById(id);
    }
}