package com.IEFinalProject.Backend.repository;

import com.IEFinalProject.Backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepo extends JpaRepository<Product,Integer> {
    Optional<Product> findByName(String name);
    List<Product> findByCategoryName(String category);
}
