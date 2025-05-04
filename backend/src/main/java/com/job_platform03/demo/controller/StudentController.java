package com.job_platform03.demo.controller;

import com.job_platform03.demo.dto.EmailRequestDto;
import com.job_platform03.demo.dto.StudentDto;
import com.job_platform03.demo.service.EmailService;
import com.job_platform03.demo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<StudentDto> saveStudent(@RequestBody StudentDto studentDto) {
        StudentDto savedStudent = studentService.saveStudent(studentDto);
        return ResponseEntity.ok(savedStudent);
    }

    @GetMapping
    public ResponseEntity<List<StudentDto>> getAllStudents() {
        List<StudentDto> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok("Deleted student successfully.");
    }

    @PostMapping("/send-emails")
    public ResponseEntity<Void> sendEmails(@RequestBody EmailRequestDto emailRequest) {
        emailService.sendEmails(emailRequest.getSubject(), emailRequest.getBody());
        return ResponseEntity.ok().build();
    }
}