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

    @GetMapping
    public ResponseEntity<List<com.bulk_email_sender.email_service.entity.Email>> getAllEmails() {
        return ResponseEntity.ok(emailService.getAllEmails());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Email> getEmailById(@PathVariable Long id) {
        Email email = (Email) emailService.getEmailById(id);
        if (email == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(email);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmail(@PathVariable Long id) {
        emailService.deleteEmail(id);
        return ResponseEntity.noContent().build();
    }
}