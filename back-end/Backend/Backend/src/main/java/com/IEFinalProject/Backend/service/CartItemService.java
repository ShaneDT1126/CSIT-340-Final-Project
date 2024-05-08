package com.IEFinalProject.Backend.service;

import com.IEFinalProject.Backend.repository.CartItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartItemService {
    @Autowired
    private CartItemRepo cartItemRepo;


}
