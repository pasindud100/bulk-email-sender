package com.bulk_email_sender.student_service.controller;

import com.bulk_email_sender.student_service.dto.StudentDto;
import com.bulk_email_sender.student_service.service.StudentService;
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

    //save
    @PostMapping
    public ResponseEntity<StudentDto> saveStudent(@RequestBody StudentDto studentDto) {
        StudentDto savedStudent = studentService.saveStudent(studentDto);
        return ResponseEntity.ok(savedStudent);
    }

    //get all
    @GetMapping
    public ResponseEntity<List<StudentDto>> getAllStudents() {
        List<StudentDto> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    //delete
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok("Deleted student successfully..");
    }

    // update
    @PutMapping("/update/{id}")
    public ResponseEntity<StudentDto> updateStudent(@PathVariable Long id, @RequestBody StudentDto studentDto) {
        StudentDto updatedStudent = studentService.updateStudent(id, studentDto);
        return ResponseEntity.ok(updatedStudent);
    }
}