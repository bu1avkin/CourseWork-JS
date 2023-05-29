package com.course.work.controllers;

import com.course.work.exception.WikiNotFoundException;
import com.course.work.models.Wiki;
import com.course.work.repository.WikiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:8081")
public class WikiController {

    @Autowired
    private WikiRepository wikiRepository;

    @PostMapping("/wiki/new")
    Wiki newPost(@RequestBody Wiki newWiki) {
        return wikiRepository.save(newWiki);
    }

    @GetMapping("/wiki")
    List<Wiki> getAllPosts() {
        return wikiRepository.findAll();
    }

    @GetMapping("/wiki/{id}")
    Wiki getPostById(@PathVariable Long id) {
        return wikiRepository.findById(id)
                .orElseThrow(() -> new WikiNotFoundException(id));
    }

    @PutMapping("/wiki/update/{id}")
    Wiki updatePost(@RequestBody Wiki newWiki, @PathVariable Long id) {
        return wikiRepository.findById(id)
                .map(aPublic -> {
                    aPublic.setTitle(newWiki.getTitle());
                    aPublic.setDescription(newWiki.getDescription());
                    aPublic.setLikes(newWiki.getLikes());
                    return wikiRepository.save(aPublic);
                }).orElseThrow(() -> new WikiNotFoundException(id));
    }

    @DeleteMapping("/wiki/delete/{id}")
    String deletePost(@PathVariable Long id){
        if(!wikiRepository.existsById(id)){
            throw new WikiNotFoundException(id);
        }
        wikiRepository.deleteById(id);
        return  "Строка S.N "+id+" удалена.";
    }
}