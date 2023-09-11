package com.example.backend.Services.LessonService;

import com.example.backend.DTO.LessonDTO;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface LessonService {

    HttpEntity<?> getLessons();

    HttpEntity<?> addLesson(LessonDTO lesson, UUID currentGroup);

    HttpEntity<?> editLessonOfGroup(UUID lessonId, LessonDTO lessonDTO);

    Object findByGroupId(UUID groupId);

    HttpEntity<?> deleteLesson(UUID lessonId);

}
