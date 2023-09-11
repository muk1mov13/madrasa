package com.example.backend.Services.SubjectService;

import com.example.backend.DTO.SubjectDTO;
import com.example.backend.Entity.Group;
import com.example.backend.Entity.Subject;
import com.example.backend.Repository.GroupRepository;
import com.example.backend.Repository.SubjectRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SubjectServiceImpl implements SubjectService {
    private final SubjectRepo subjectRepo;
    private final GroupRepository groupRepository;

    @Override
    public void getSubject(UUID id) {
        subjectRepo.findByGroup_Id(id);
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
    public void deleteSubject(UUID id) {
        subjectRepo.deleteById(id);
    }

    @Override
    public void updateSubject(UUID id, SubjectDTO subjectDTO) {
        Subject subject = subjectRepo.findById(id).get();
        Subject subject1 = new Subject(
                subject.getId(),
                subject.getName(),
                subject.getGroup()
        );
        subjectRepo.save(subject1);
    }
}
