package com.job_platform03.demo.service;
import com.job_platform03.demo.entity.Student;
import com.job_platform03.demo.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private StudentRepository studentRepository;

    public void sendEmails(String subject, String body) {
        List<Student> students = studentRepository.findAll();
        for (Student student : students) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(student.getEmail());
            message.setSubject(subject);
            message.setText(body.replace("{name}", student.getFirstName()));
            mailSender.send(message);
        }
    }
}