package com.example.backend.Services.LessonService;

import com.example.backend.DTO.LessonDTO;
import com.example.backend.Entity.Lesson;
import com.example.backend.Repository.GroupRepository;
import com.example.backend.Repository.LessonRepository;
import com.example.backend.Repository.WeekDayRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LessonServiceImpl implements LessonService {
    private final LessonRepository repository;
    private final WeekDayRepo weekDayRepo;
    private final GroupRepository groupRepository;
    @Override
    public HttpEntity<?> getLessons() {
        List<Lesson> lessons = repository.findAll();
        return ResponseEntity.ok(lessons);
    }

    @Override
    public HttpEntity<?> addLesson(LessonDTO lessonDTO, UUID currentGroup) {
        Lesson lesson = convertLessonDTOToEntity(lessonDTO, currentGroup);
        repository.save(lesson);
        return ResponseEntity.ok("Lesson added successfully");
    }

    @Override
    public HttpEntity<?> editLessonOfGroup(UUID lessonId, LessonDTO lessonDTO) {
        Lesson existingLesson = repository.findById(lessonId).orElse(null);
        if (existingLesson == null) {
            return ResponseEntity.notFound().build();
        }
        existingLesson.setName(lessonDTO.getName());
        existingLesson.setPara(lessonDTO.getPara());
        existingLesson.setRoom(lessonDTO.getRoom());
        existingLesson.setTeacher(lessonDTO.getTeacher());
        repository.save(existingLesson);
        return ResponseEntity.ok("Lesson updated successfully");
    }

    @Override
    public Object findByGroupId(UUID groupId) {
        List<Lesson> byGroupId = repository.findByGroupId(groupId);
        return ResponseEntity.ok(byGroupId);
    }

    @Override
    public HttpEntity<?> deleteLesson(UUID lessonId) {
        Lesson existingLesson = repository.findById(lessonId).orElse(null);
        if (existingLesson == null) {
            return ResponseEntity.notFound().build();
        }
        repository.delete(existingLesson);
        return ResponseEntity.ok("Lesson deleted successfully");
    }

    private Lesson convertLessonDTOToEntity(LessonDTO lessonDTO, UUID currentGroup) {
        Lesson lesson = new Lesson();
        lesson.setWeekDay(weekDayRepo.findById(lessonDTO.getWeekId()).orElseThrow());
        lesson.setName(lessonDTO.getName());
        lesson.setPara(lessonDTO.getPara());
        lesson.setRoom(lessonDTO.getRoom());
        lesson.setGroup(groupRepository.findById(lessonDTO.getGroupId()).orElseThrow()  );
        lesson.setTeacher(lessonDTO.getTeacher());
        return lesson;
    }
}
