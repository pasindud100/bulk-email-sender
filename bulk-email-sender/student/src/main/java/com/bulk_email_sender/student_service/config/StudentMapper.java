package com.bulk_email_sender.student_service.config;

import com.bulk_email_sender.student_service.dto.StudentDto;
import com.bulk_email_sender.student_service.entity.Student;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StudentMapper {
    StudentDto toDto(Student student);
    Student toEntity(StudentDto studentDto);
}