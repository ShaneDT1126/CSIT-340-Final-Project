package com.IEFinalProject.Backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderItemId;
    private Integer quantity;
    private Double price;

    @ManyToOne
    @JoinColumn(name = "orderId")
    private Orders orders;

    @ManyToOne
    @JoinColumn(name = "productId")
    private Product product;
}
