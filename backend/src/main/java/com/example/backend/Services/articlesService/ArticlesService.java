package com.example.backend.Services.articlesService;

import com.example.backend.Entity.Articles;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface ArticlesService {

    HttpEntity<?> getArticles(String type);

    HttpEntity<?> saveArticle(Articles articles,String type);

    HttpEntity<?> updateArticle(UUID id, Articles articles);

    HttpEntity<?> deleteArticle(UUID id);

}
