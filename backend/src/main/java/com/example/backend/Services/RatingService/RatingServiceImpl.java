package com.example.backend.Services.RatingService;

import com.example.backend.Repository.RatingRepo;
import com.example.backend.Repository.StudentRepo;
import com.example.backend.Repository.SubjectRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RatingServiceImpl implements RatingService {
    private final RatingRepo ratingRepo;
    private final StudentRepo studentRepo;
    private final SubjectRepo subjectRepo;

    @Override
    public void getRating() {
        ratingRepo.findAll();
    }
}
