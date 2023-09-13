package com.example.backend.Services.RatingService;

import com.example.backend.DTO.RatingDTO;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface RatingService {
    HttpEntity<?> getRating(UUID id);

    void deleteRating(UUID id);

    HttpEntity<?> addRating(RatingDTO ratingDTO);

    HttpEntity<?> updateRating(UUID id, RatingDTO ratingDTO);
}
