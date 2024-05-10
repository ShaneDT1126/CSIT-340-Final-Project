package com.IEFinalProject.Backend.dto;

import com.IEFinalProject.Backend.model.Cart;
import com.IEFinalProject.Backend.model.CartItem;
import com.IEFinalProject.Backend.model.OurUsers;
import com.IEFinalProject.Backend.model.Product;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
//@JsonIgnoreProperties({"cart"})
public class CartItemReqRes {
    private String message;
    private String error;
    private int statusCode;
    private OurUsers ourUsers;
    private Integer quantity;
    private CartItem cartItem;
    private Cart cart;
    private Product product;
}
