package com.example.backend.Services.StudentService;

import com.example.backend.DTO.StudentDTO;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface StudentService {


    HttpEntity<?> getStudent(UUID id);

    void addStudent(StudentDTO studentDTO);

    void deleteStudnet(UUID id);

    void updateStudent(UUID id, StudentDTO studentDTO);
}
