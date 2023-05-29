package com.course.work.exception;

public class PublicNotFoundException extends RuntimeException{
    public PublicNotFoundException(Long id){
        super("Невозможно найти строку S.N "+ id);
    }
}
