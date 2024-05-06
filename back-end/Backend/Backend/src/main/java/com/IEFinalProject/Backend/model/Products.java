package com.IEFinalProject.Backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productId;
    private String name;
    private String description;
    private Double price;


    @OneToOne
    @JoinColumn(name = "categoryId")
    private Category category;

    @OneToOne(mappedBy = "products", cascade = CascadeType.ALL)
    private ProductImages productImages;


}
