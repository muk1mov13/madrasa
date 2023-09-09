package com.example.backend.Services.articlesService;

import com.example.backend.Entity.Articles;
import com.example.backend.Repository.ArticlesRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class ArticlesServiceImpl implements ArticlesService {

    private final ArticlesRepository articlesRepository;

    public ArticlesServiceImpl(ArticlesRepository articlesRepository) {
        this.articlesRepository = articlesRepository;
    }

    @Override
    public HttpEntity<?> getArticles(String type) {
        List<Articles> articles = articlesRepository.findAllByTypeOrderByCreated_atDesc(type).orElseThrow(() -> new NoSuchElementException("not found"));
        return ResponseEntity.ok(articles);
    }

    @Override
    public HttpEntity<?> saveArticle(Articles articles, String type) {
        Articles willbeSavedarticles = Articles
                .builder()
                .id(UUID.randomUUID())
                .title(articles.getTitle())
                .body(articles.getBody())
                .type(articles.getType())
                .status(articles.getStatus())
                .created_at(Timestamp.valueOf(LocalDateTime.now()))
                .build();
        Articles saved = articlesRepository.save(willbeSavedarticles);
        return ResponseEntity.ok(saved);
    }

    @Override
    public HttpEntity<?> updateArticle(UUID id, Articles articles) {
        Articles foundedArticle = articlesRepository.findById(id).orElseThrow(() -> new NoSuchElementException("not found"));
        foundedArticle.setTitle(articles.getTitle());
        foundedArticle.setBody(articles.getBody());
        foundedArticle.setType(articles.getType());
        foundedArticle.setStatus(articles.getStatus());
        Articles editedArticle = articlesRepository.save(foundedArticle);
        return ResponseEntity.ok(editedArticle);
    }

    @Override
    public HttpEntity<?> deleteArticle(UUID id) {
        articlesRepository.deleteById(id);
        return ResponseEntity.ok().body("");
    }
}
