package com.bulk_email_sender.email_service.controller;

import com.bulk_email_sender.email_service.dto.EmailRequestDto;
import com.bulk_email_sender.email_service.services.EmailService;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/emails")
@CrossOrigin(origins = "http://localhost:3000")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<Void> sendEmails(@RequestBody EmailRequestDto request) {
        emailService.sendBulkEmails(request.getSubject(), request.getBody());
        return ResponseEntity.ok().build();
    }
}