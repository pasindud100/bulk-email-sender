package com.bulk_email_sender.student_service.repository;

import com.bulk_email_sender.student_service.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {

    // Custom method to check if a category with a specific name exists.
    Student findByEmail(String email);

}