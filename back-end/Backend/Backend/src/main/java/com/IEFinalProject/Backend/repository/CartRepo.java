package com.IEFinalProject.Backend.repository;

import com.IEFinalProject.Backend.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepo extends JpaRepository<Cart,Integer> {
    Optional<Cart>findByCartId(Integer cartId);
}
