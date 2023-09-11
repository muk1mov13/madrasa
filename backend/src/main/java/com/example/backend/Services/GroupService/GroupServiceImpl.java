package com.example.backend.Services.GroupService;

import com.example.backend.DTO.GroupDTO;
import com.example.backend.Entity.Group;
import com.example.backend.Repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {
    private final GroupRepository repository;
    private final GroupRepository groupRepository;
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
        repository.save(new Group(id,dto.getName(),dto.getCount(), dto.getKurs()));
        return ResponseEntity.ok(dto);
    }
    @Override
    public HttpEntity<?> deleteGroupById(UUID id) {
        try {
            repository.deleteById(id);
        }catch (Exception e){
            repository.deleteById(id);
        }
        return ResponseEntity.ok("Deleted Successfully!");
    }

    @Override
    public Object findByGroupId(UUID groupId) {
        Optional<Group> byId = repository.findById(groupId);
        if(byId.isPresent()){
            return ResponseEntity.ok(byId.get());
        }
        return ResponseEntity.ok("gruh mavjud emas");
    }
}
