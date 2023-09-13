package com.example.backend.Services.GroupService;

import com.example.backend.DTO.GroupDTO;
import com.example.backend.Entity.Group;
import com.example.backend.Entity.Lesson;
import com.example.backend.Entity.Student;
import com.example.backend.Entity.Subject;
import com.example.backend.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {
    private final GroupRepository repository;
    private final StudentRepo studentRepo;
    private final RatingRepo ratingRepo;
    private final LessonRepository lessonRepository;
    private final SubjectRepo subjectRepo;

    @Override
    public HttpEntity<?> getGroups() {
        return ResponseEntity.ok(repository.findAll());
    }

    @Override
    public HttpEntity<?> addGroups(GroupDTO DTO) {
        Group savedGroup = repository.save(new Group(null, DTO.getName(), DTO.getCount(), DTO.getKurs()));

        return ResponseEntity.ok(savedGroup);
    }

    @Override
    public HttpEntity<?> editGroup(UUID id, GroupDTO dto) {
        repository.save(new Group(id, dto.getName(), dto.getCount(), dto.getKurs()));
        return ResponseEntity.ok(dto);
    }

    @Transactional
    @Override
    public HttpEntity<?> deleteGroupById(UUID id) {
        List<Student> students = studentRepo.findByGroup_Id(id);
        List<Subject> subjects = subjectRepo.findByGroup_IdOrderById(id);
        List<Lesson> lessons = lessonRepository.findByGroupId(id);
        if (!students.isEmpty()) {
            for (Student student : students) {
                ratingRepo.deleteAllByStudentId(student.getId());
            }
            studentRepo.deleteAll(students);
        }
        if (!subjects.isEmpty()) {
            subjectRepo.deleteAll(subjects);
        }
        if (!lessons.isEmpty()) {
            lessonRepository.deleteAll(lessons);
        }
        repository.deleteById(id);
        return ResponseEntity.ok("Deleted Successfully!");
    }

    @Override
    public Object findByGroupId(UUID groupId) {
        Optional<Group> byId = repository.findById(groupId);
        if (byId.isPresent()) {
            return ResponseEntity.ok(byId.get());
        }
        return ResponseEntity.ok("guruh mavjud emas");
    }
}
