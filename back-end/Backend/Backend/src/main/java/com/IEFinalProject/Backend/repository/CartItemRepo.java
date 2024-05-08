package com.IEFinalProject.Backend.repository;

import com.IEFinalProject.Backend.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepo extends JpaRepository<CartItem,Integer> {
}
