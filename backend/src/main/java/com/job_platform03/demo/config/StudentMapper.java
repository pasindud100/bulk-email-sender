package com.job_platform03.demo.config;

import com.job_platform03.demo.dto.StudentDto;
import com.job_platform03.demo.entity.Student;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StudentMapper {

    StudentDto toDto(Student student);
    Student toEntity(StudentDto studentDto);
}
