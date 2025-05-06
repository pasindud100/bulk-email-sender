package com.bulk_email_sender.student_service.service;

import com.bulk_email_sender.student_service.config.StudentMapper;
import com.bulk_email_sender.student_service.dto.StudentDto;
import com.bulk_email_sender.student_service.entity.Student;
import com.bulk_email_sender.student_service.exception.UserAlreadyExistException;
import com.bulk_email_sender.student_service.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentMapper studentMapper;

    public StudentDto saveStudent(StudentDto studentDto) {
        Student studentToSave = studentMapper.toEntity(studentDto);

        Student existingStudent = studentRepository.findByEmail(studentToSave.getEmail());

        if (existingStudent != null) {
            throw new UserAlreadyExistException("User  already exists with email: " + studentToSave.getEmail());
        }

        Student savedStudent = studentRepository.save(studentToSave);
        return studentMapper.toDto(savedStudent);
    }

    //get all
    public List<StudentDto> getAllStudents() {
        List<Student> receivedStudents = studentRepository.findAll();
        return receivedStudents.stream()
                .map(studentMapper::toDto)
                .collect(Collectors.toList());
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    public StudentDto updateStudent(Long id, StudentDto studentDto) {
        Optional<Student> isExist = studentRepository.findById(id);
        if (!isExist.isPresent()) {
            throw new RuntimeException("Student not found with id: " + id);
        }

        Student existingStudent = isExist.get();
        existingStudent.setFirstName(studentDto.getFirstName());
        existingStudent.setLastName(studentDto.getLastName());
        existingStudent.setEmail(studentDto.getEmail());

        Student updatedStudent = studentRepository.save(existingStudent);
        return studentMapper.toDto(updatedStudent);
    }
}