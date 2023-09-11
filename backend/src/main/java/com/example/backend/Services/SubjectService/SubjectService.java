package com.example.backend.Services.SubjectService;

import com.example.backend.DTO.SubjectDTO;

import java.util.UUID;

public interface SubjectService {


    void getSubject(UUID id);

    void addSubject(SubjectDTO studentDTO);

    void deleteSubject(UUID id);

    void updateSubject(UUID id, SubjectDTO studentDTO);
}
