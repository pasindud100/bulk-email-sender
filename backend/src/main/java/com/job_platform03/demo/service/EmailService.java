package com.job_platform03.demo.service;

import com.job_platform03.demo.entity.Student;
import com.job_platform03.demo.repository.StudentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private StudentRepository studentRepository;

    private ObjectMapper objectMapper = new ObjectMapper();

    private String convertHtmlToStyledHtml(String html ) {
        // This method can be customized to convert raw HTML to styled HTML if needed
        return html; // For now, just return the HTML as is
    }

    public void sendEmails(String subject, String bodyHtml) {
        List<Student> students = studentRepository.findAll();
        String styledHtmlContent = convertHtmlToStyledHtml(bodyHtml);

        for (Student student : students) {
            try {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
                helper.setTo(student.getEmail());
                helper.setSubject(subject);
                String personalizedHtml = styledHtmlContent.replace("{name}", student.getFirstName());
                helper.setText(personalizedHtml, true); // true = isHtml
                mailSender.send(message);
            } catch (MessagingException e) {
                e.printStackTrace();
            }
        }
    }
}