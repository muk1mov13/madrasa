package com.example.backend.Services.StudentService;

import com.example.backend.DTO.StudentDTO;
import com.example.backend.Entity.Group;
import com.example.backend.Entity.Student;
import com.example.backend.Repository.GroupRepository;
import com.example.backend.Repository.StudentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {
    private final StudentRepo studentRepo;
    private final GroupRepository groupRepository;

    @Override
    public HttpEntity<?> getStudent(UUID id) {

      return ResponseEntity.ok( studentRepo.findAllByGroup_IdAndArxiveOrderById(id, true));
    }

    @Override
    public void addStudent(StudentDTO studentDTO) {
        Optional<Group> byId = groupRepository.findById(studentDTO.getGroupId());

        Student student = new Student(
                studentDTO.getName(),
                byId.get(),
                true,
                ""
        );
        studentRepo.save(student);

    }

    @Override
    public void deleteStudnet(Integer id) {
        Student student = studentRepo.findById(id).get();
        Student student1 = new Student(
                student.getId(),
                student.getName(),
                student.getGroup(),
                false,
                ""
        );
        studentRepo.save(student1);
    }

    @Override
    public void updateStudent(Integer id, StudentDTO studentDTO) {
        Student student = studentRepo.findById(id).get();
        Student student1 = new Student(
                student.getId(),
                studentDTO.getName(),
                student.getGroup(),
                true,
                student.getColor()
        );
        studentRepo.save(student1);
    }
}
