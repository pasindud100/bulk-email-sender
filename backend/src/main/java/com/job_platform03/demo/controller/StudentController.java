package com.job_platform03.demo.controller;

import com.job_platform03.demo.dto.StudentDto;
import com.job_platform03.demo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

    //save student..
    @PostMapping
    public ResponseEntity<StudentDto> saveStudent(@RequestBody StudentDto studentDto) {
        StudentDto savesStudent = studentService.saveStudent(studentDto);
        return ResponseEntity.ok(savesStudent);

    }

    //get all students
    @GetMapping
    public ResponseEntity<List<StudentDto>> getAllStudents() {
        List<StudentDto> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    //update student
    @PutMapping("update/{id}")
    public ResponseEntity<StudentDto> updateStudent(@PathVariable Long id, @RequestBody StudentDto studentDto) {
        StudentDto updatedStudent = studentService.updateStudent(id, studentDto);
        return ResponseEntity.ok(updatedStudent);
    }

    //delete student
    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok("Deleted student successfully.");
    }
}