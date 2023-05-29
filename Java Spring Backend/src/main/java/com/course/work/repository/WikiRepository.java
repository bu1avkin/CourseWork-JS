package com.course.work.repository;

import com.course.work.models.Wiki;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WikiRepository extends JpaRepository<Wiki,Long> {
}
