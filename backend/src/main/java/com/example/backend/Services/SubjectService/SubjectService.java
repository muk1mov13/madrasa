package com.example.backend.Services.SubjectService;

import com.example.backend.DTO.SubjectDTO;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface SubjectService {


    HttpEntity<?> getSubject(UUID id);

    void addSubject(SubjectDTO studentDTO);

    void deleteSubject(Integer id);

    void updateSubject(Integer id, SubjectDTO studentDTO);
}
