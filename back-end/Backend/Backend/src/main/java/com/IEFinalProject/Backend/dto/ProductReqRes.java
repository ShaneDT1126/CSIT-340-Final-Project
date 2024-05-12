package com.IEFinalProject.Backend.dto;

import com.IEFinalProject.Backend.model.Category;
import com.IEFinalProject.Backend.model.ProductImages;
import com.IEFinalProject.Backend.model.Product;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
    //@JsonIgnoreProperties({"category"})
    private Product product;
    private List<Product> allProducts;


}
