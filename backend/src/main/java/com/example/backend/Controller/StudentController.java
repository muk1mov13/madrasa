package com.example.backend.Controller;

import com.example.backend.DTO.StudentDTO;
import com.example.backend.Entity.Student;
import com.example.backend.Repository.StudentRepo;
import com.example.backend.Services.StudentService.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/student")
@RequiredArgsConstructor
@CrossOrigin
public class StudentController {
    private final StudentService studentService;
private final StudentRepo studentRepo;
    @GetMapping("public/{id}")
    public HttpEntity<?> getStudent(@PathVariable UUID id) {

        return studentService.getStudent(id);
    }

    @PostMapping
    public void addStudent(@RequestBody StudentDTO studentDTO) {
        studentService.addStudent(studentDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Integer id) {
        studentService.deleteStudnet(id);
    }

    @PutMapping("/{id}")
    public void updateStudent(@PathVariable Integer id, @RequestBody StudentDTO studentDTO) {
        studentService.updateStudent(id, studentDTO);
    }
    @PutMapping("/color/{id}/{colorName}")
    public HttpEntity<?> changeColor(@PathVariable Integer id, @PathVariable String colorName){
        System.out.println(colorName);
        Student student = studentRepo.findById(id).orElseThrow();
        student.setColor(colorName);
        studentRepo.save(student);
        return ResponseEntity.ok("ok");
    }
}

