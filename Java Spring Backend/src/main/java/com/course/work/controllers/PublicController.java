package com.course.work.controllers;

import com.course.work.exception.PublicNotFoundException;
import com.course.work.models.Public;
import com.course.work.repository.PublicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:8081")
public class PublicController {

    @Autowired
    private PublicRepository publicRepository;

    @PostMapping("/content/new")
    Public newRow(@RequestBody Public newPublic) {
        return publicRepository.save(newPublic);
    }

    @GetMapping("/content")
    List<Public> getAllRows() {
        return publicRepository.findAll();
    }

    @GetMapping("/content/view/{id}")
    Public getRowById(@PathVariable Long id) {
        return publicRepository.findById(id)
                .orElseThrow(() -> new PublicNotFoundException(id));
    }

    @PutMapping("/content/update/{id}")
    Public updateRow(@RequestBody Public newPublic, @PathVariable Long id) {
        return publicRepository.findById(id)
                .map(aPublic -> {
                    aPublic.setTitle(newPublic.getTitle());
                    aPublic.setDescription(newPublic.getDescription());
                    aPublic.setMaintext(newPublic.getMaintext());
                    return publicRepository.save(aPublic);
                }).orElseThrow(() -> new PublicNotFoundException(id));
    }

    @GetMapping("/content/update/{id}")
    Public getPublicByIdForUpdate(@PathVariable Long id) {
        return publicRepository.findById(id)
                .orElseThrow(() -> new PublicNotFoundException(id));
    }

    @DeleteMapping("/content/delete/{id}")
    String deleteRow(@PathVariable Long id){
        if(!publicRepository.existsById(id)){
            throw new PublicNotFoundException(id);
        }
        publicRepository.deleteById(id);
        return  "Строка S.N "+id+" удалена.";
    }
}