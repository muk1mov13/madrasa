package com.example.backend.Controller;

import com.example.backend.DTO.StudentDTO;
import com.example.backend.Services.StudentService.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/student")
@RequiredArgsConstructor
@CrossOrigin
public class StudentController {
    private final StudentService studentService;

    @GetMapping("public/{id}")
    public HttpEntity<?> getStudent(@PathVariable UUID id) {

        return studentService.getStudent(id);
    }

    @PostMapping
    public void addStudent(@RequestBody StudentDTO studentDTO) {
        studentService.addStudent(studentDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable UUID id) {
        studentService.deleteStudnet(id);
    }

    @PutMapping("/{id}")
    public void updateStudent(@PathVariable UUID id, @RequestBody StudentDTO studentDTO) {
        studentService.updateStudent(id, studentDTO);
    }
}

