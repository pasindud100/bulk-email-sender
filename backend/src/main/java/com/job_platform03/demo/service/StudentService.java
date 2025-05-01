package com.job_platform03.demo.service;

import com.job_platform03.demo.config.StudentMapper;
import com.job_platform03.demo.dto.StudentDto;
import com.job_platform03.demo.entity.Student;
import com.job_platform03.demo.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private StudentMapper studentMapper;

    public StudentDto saveStudent(StudentDto studentDto) {
        Student savedStudent = studentRepository.save(studentMapper.toEntity(studentDto));
        return studentMapper.toDto(savedStudent);
    }

    public List<StudentDto> getAllStudents() {
        List<Student> receivedStudents = studentRepository.findAll();
        return receivedStudents.stream()
                .map(studentMapper::toDto)
                .collect(Collectors.toList());
    }

    public StudentDto updateStudent(Long id, StudentDto studentDto) {
        Student studentToUpdate = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        studentToUpdate = studentMapper.toEntity(studentDto);
        studentToUpdate.setId(id);

        Student updatedStudent = studentRepository.save(studentToUpdate);
        updatedStudent.setId(id);
        return studentMapper.toDto(updatedStudent);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}