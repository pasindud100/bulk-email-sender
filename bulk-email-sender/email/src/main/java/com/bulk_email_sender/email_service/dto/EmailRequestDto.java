package com.bulk_email_sender.email_service.dto;

public class EmailRequestDto {
    private String subject;
    private String body;

    public EmailRequestDto() {
    }

    public EmailRequestDto(String subject, String body) {
        this.subject = subject;
        this.body = body;
    }

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
}