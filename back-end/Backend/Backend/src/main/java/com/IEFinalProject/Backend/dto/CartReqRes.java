package com.IEFinalProject.Backend.dto;

import com.IEFinalProject.Backend.model.Cart;
import com.IEFinalProject.Backend.model.CartItem;
import com.IEFinalProject.Backend.model.OurUsers;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
//@JsonIgnoreProperties({"ourUsers","cart_item"})
public class CartReqRes {
    private String message;
    private String error;
    private int statusCode;
    //@JsonIgnoreProperties({"ourUsers"})
    private OurUsers ourUsers;
    //@JsonIgnoreProperties({"cart"})
    private List<CartItem> cartItems;
    //@JsonIgnoreProperties({"cart_item"})
    private Cart cart;
}
