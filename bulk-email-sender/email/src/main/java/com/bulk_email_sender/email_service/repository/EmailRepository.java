package com.bulk_email_sender.email_service.repository;


import com.bulk_email_sender.email_service.entity.Email;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepository extends JpaRepository<Email, Long> {
}