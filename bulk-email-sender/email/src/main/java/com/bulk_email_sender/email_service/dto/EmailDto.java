package com.bulk_email_sender.email_service.dto;

import java.util.List;

public class EmailDto {
    private String subject;
    private String body;
    private List<String> recipients;

    // Getters and Setters
    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public List<String> getRecipients() {
        return recipients;
    }

    public void setRecipients(List<String> recipients) {
        this.recipients = recipients;
    }

    public EmailDto() {
    }

    public EmailDto(String subject, String body, List<String> recipients) {
        this.subject = subject;
        this.body = body;
        this.recipients = recipients;
    }
}