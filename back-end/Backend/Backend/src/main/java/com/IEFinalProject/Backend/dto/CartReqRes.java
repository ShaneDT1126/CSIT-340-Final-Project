package com.IEFinalProject.Backend.dto;

import com.IEFinalProject.Backend.model.CartItem;
import com.IEFinalProject.Backend.model.OurUsers;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartReqRes {
    private OurUsers ourUsers;
    private List<CartItem> cartItems;
}
