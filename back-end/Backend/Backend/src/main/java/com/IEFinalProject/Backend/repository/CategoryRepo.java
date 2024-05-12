package com.IEFinalProject.Backend.repository;

import com.IEFinalProject.Backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepo extends JpaRepository<Category,Integer> {
    Category findByName(String name);
}
