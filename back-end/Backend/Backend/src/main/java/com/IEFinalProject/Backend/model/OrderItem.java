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
    @JoinColumn(name = "OrderId")
    private Orders order;

    @OneToOne
    @JoinColumn(name = "productId")
    private Products product;
}
