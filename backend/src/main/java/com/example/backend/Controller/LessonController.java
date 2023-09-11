package com.example.backend.Controller;

import com.example.backend.DTO.LessonDTO;
import com.example.backend.Services.LessonService.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/lesson")
@RequiredArgsConstructor
public class LessonController {
    private final LessonService lessonService;
    @GetMapping
    public HttpEntity<?> getAll(){
        return lessonService.getLessons();
    }

    @GetMapping("/public/{groupId}")
    public HttpEntity<?> getLesson(@PathVariable UUID groupId){
        return ResponseEntity.ok(lessonService.findByGroupId(groupId));
    }

    @PutMapping("/{lessonId}")
    public HttpEntity<?> editLesson(@PathVariable UUID lessonId,@RequestBody LessonDTO lessonDTO) {
        return lessonService.editLessonOfGroup(lessonId,lessonDTO);
    }
    @DeleteMapping("/{lessonId}")
    public HttpEntity<?> deleteLesson(@PathVariable UUID lessonId){
        return lessonService.deleteLesson(lessonId);
    }

    @PostMapping("/{currentGroup}")
    private HttpEntity<?> addLesson(@RequestBody LessonDTO lessonDTO, @PathVariable UUID currentGroup){
        System.out.println(currentGroup);
        return lessonService.addLesson(lessonDTO, currentGroup);
    }


}
