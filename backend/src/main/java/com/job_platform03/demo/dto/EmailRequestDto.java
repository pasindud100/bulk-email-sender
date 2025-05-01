package com.job_platform03.demo.dto;

import java.util.List;

public class EmailRequestDto {
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

    public EmailRequestDto() {
    }

    public EmailRequestDto(String subject, String body, List<String> recipients) {
        this.subject = subject;
        this.body = body;
        this.recipients = recipients;
    }
}