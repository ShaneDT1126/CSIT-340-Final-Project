package com.IEFinalProject.Backend.dto;

import com.IEFinalProject.Backend.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDTO {
    private Integer cartItemId;
    private Integer quantity;
    private Product product;
}
