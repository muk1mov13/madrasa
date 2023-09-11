package com.example.backend.Controller;

import com.example.backend.Entity.Articles;
import com.example.backend.Services.articlesService.ArticlesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/article")
public class ArticlesController {

    private final ArticlesService articlesService;

    @GetMapping("/public")
    public HttpEntity<?> getArticles(@RequestParam String type) {
        return articlesService.getArticles(type);
    }

    @PostMapping
    public HttpEntity<?> saveArticles(@RequestBody Articles articles) {
        return articlesService.saveArticle(articles, articles.getType());
    }

    @PutMapping("{id}")
    public HttpEntity<?> updateArticles(@PathVariable UUID id, @RequestBody Articles articles) {
        return articlesService.updateArticle(id, articles);
    }

    @DeleteMapping("{id}")
    public HttpEntity<?> deleteArticle(@PathVariable UUID id) {
        return articlesService.deleteArticle(id);
    }

}
