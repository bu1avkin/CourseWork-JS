package com.course.work.exception;

public class WikiNotFoundException extends RuntimeException{
    public WikiNotFoundException(Long id){
        super("Невозможно найти строку S.N "+ id);
    }
}
