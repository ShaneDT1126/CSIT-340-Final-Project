package com.IEFinalProject.Backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cartId;

    @OneToOne
    @JoinColumn(name = "userId")
    private OurUsers user;

    @OneToMany(mappedBy = "cart")
    private List<CartItem> cartItems;


}
