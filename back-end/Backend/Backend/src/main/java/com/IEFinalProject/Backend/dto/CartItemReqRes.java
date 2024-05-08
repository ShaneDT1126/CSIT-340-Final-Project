package com.IEFinalProject.Backend.dto;

import com.IEFinalProject.Backend.model.Cart;
import com.IEFinalProject.Backend.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemReqRes {
    private Integer quantity;
    private Cart cart;
    private Product product;
}
