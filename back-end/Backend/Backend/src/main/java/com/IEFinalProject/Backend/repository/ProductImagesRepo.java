package com.IEFinalProject.Backend.repository;

import com.IEFinalProject.Backend.model.ProductImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductImagesRepo extends JpaRepository<ProductImages, Integer> {
    Optional<ProductImages> findByFileName(String fileName);
}
