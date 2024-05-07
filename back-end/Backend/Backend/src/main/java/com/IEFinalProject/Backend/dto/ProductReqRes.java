package com.IEFinalProject.Backend.dto;

import com.IEFinalProject.Backend.model.Category;
import com.IEFinalProject.Backend.model.ProductImages;
import com.IEFinalProject.Backend.model.Products;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Optional;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductReqRes {
    private String message;
    private String error;
    private int statusCode;
    private String name;
    private String description;
    private double price;
    private Category category;
    private ProductImages productImages;
    private Products products;


}
