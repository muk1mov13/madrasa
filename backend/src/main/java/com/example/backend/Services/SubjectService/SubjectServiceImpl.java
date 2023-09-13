package com.example.backend.Services.SubjectService;

import com.example.backend.DTO.SubjectDTO;
import com.example.backend.Entity.Group;
import com.example.backend.Entity.Subject;
import com.example.backend.Repository.GroupRepository;
import com.example.backend.Repository.SubjectRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SubjectServiceImpl implements SubjectService {
    private final SubjectRepo subjectRepo;
    private final GroupRepository groupRepository;

    @Override
    public HttpEntity<?> getSubject(UUID id) {
        List<Subject> byGroupId = subjectRepo.findByGroup_IdOrderById(id);
        return ResponseEntity.ok(byGroupId);
    }

    @Override
    public void addSubject(SubjectDTO subjectDTO) {
        Optional<Group> byId = groupRepository.findById(subjectDTO.getGroupId());

        Subject subject = new Subject(
                subjectDTO.getName(),
                byId.get()
        );
        subjectRepo.save(subject);

    }

    @Override
    public void deleteSubject(Integer id) {
        subjectRepo.deleteById(id);
    }

    @Override
    public void updateSubject(Integer id, SubjectDTO subjectDTO) {
        Subject subject = subjectRepo.findById(id).get();
        Subject subject1 = new Subject(
                subject.getId(),
                subjectDTO.getName(),
                subject.getGroup()
        );
        subjectRepo.save(subject1);
    }
}
