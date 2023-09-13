package com.example.backend.Services.RatingService;

import com.example.backend.DTO.RatingDTO;
import com.example.backend.Entity.Rating;
import com.example.backend.Entity.Student;
import com.example.backend.Entity.Subject;
import com.example.backend.Projection.ResponseRating;
import com.example.backend.Repository.RatingRepo;
import com.example.backend.Repository.StudentRepo;
import com.example.backend.Repository.SubjectRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RatingServiceImpl implements RatingService {
    private final RatingRepo ratingRepo;
    private final StudentRepo studentRepo;
    private final SubjectRepo subjectRepo;

    @Override
    public HttpEntity<?> getRating(UUID id) {
        List<Student> byGroupId = studentRepo.findAllByGroup_IdAndArxiveOrderById(id, true);
        List<ResponseRating>result=new LinkedList<>();
        for (Student student : byGroupId){
            List<Rating> byStudentId = ratingRepo.findByStudentId(student.getId());
            ResponseRating responseRating1=new ResponseRating(student, byStudentId);
            result.add(responseRating1);
        }


        return ResponseEntity.ok(result);

    }

    @Override
    public void deleteRating(UUID id) {

        ratingRepo.deleteById(id);
    }

    @Override
    public  HttpEntity<?> addRating(RatingDTO ratingDTO) {
        Optional<Student> student = studentRepo.findById(ratingDTO.getStudentId());
        Optional<Subject> subject = subjectRepo.findById(ratingDTO.getSubjectId());
        Rating rating = new Rating(subject.get(), student.get(), ratingDTO.getMark());
        Rating save = ratingRepo.save(rating);
        return ResponseEntity.ok(save);

    }

    @Override
    public  HttpEntity<?> updateRating(UUID id, RatingDTO ratingDTO) {
        Optional<Student> student = studentRepo.findById(ratingDTO.getStudentId());
        Optional<Subject> subject = subjectRepo.findById(ratingDTO.getSubjectId());
        Rating rating = new Rating(id, subject.get(), student.get(), ratingDTO.getMark()

        );

        Rating save = ratingRepo.save(rating);
        return ResponseEntity.ok(save);
    }
}
