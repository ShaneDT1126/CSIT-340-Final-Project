package com.IEFinalProject.Backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "images")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductImages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer imageId;

    private String fileName;
    private String fileType;
    private String filePath;

    @OneToOne
    @JoinColumn(name = "product_id", referencedColumnName = "productId")
    private Product product;

}
