package com.IEFinalProject.Backend.repository;

import com.IEFinalProject.Backend.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepo extends JpaRepository<Products,Integer> {
    Optional<Products> findByName(String name);
}
