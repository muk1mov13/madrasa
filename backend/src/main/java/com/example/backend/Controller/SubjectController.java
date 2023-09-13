package com.example.backend.Controller;

import com.example.backend.DTO.SubjectDTO;
import com.example.backend.Services.SubjectService.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/subject/")
@RequiredArgsConstructor
@CrossOrigin
public class SubjectController {
    private final SubjectService subjectService;

    @GetMapping("/{id}")
    public HttpEntity<?> getSubject(@PathVariable UUID id) {
        return subjectService.getSubject(id);
    }
    @PostMapping
    public void addSubject(@RequestBody SubjectDTO subjectDTO) {
        subjectService.addSubject(subjectDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteSubject(@PathVariable Integer id) {
        subjectService.deleteSubject(id);
    }

    @PutMapping("/{id}")
    public void updateSubject(@PathVariable Integer id, @RequestBody SubjectDTO subjectDTO) {
        subjectService.updateSubject(id,subjectDTO);
    }
}

