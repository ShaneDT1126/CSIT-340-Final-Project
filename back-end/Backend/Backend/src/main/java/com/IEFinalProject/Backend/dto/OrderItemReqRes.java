package com.IEFinalProject.Backend.dto;

import com.IEFinalProject.Backend.model.OrderItem;
import com.IEFinalProject.Backend.model.Orders;
import com.IEFinalProject.Backend.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemReqRes {
    private String message;
    private String error;
    private int statusCode;
    private OrderItem orderItem;
    private int quantity;
    private double price;
    private Orders orders;
    private Product product;

}
