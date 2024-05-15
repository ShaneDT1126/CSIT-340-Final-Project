package com.IEFinalProject.Backend.dto;

import com.IEFinalProject.Backend.model.OrderItem;
import com.IEFinalProject.Backend.model.Orders;
import com.IEFinalProject.Backend.model.OurUsers;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderReqRes {
    private String message;
    private String error;
    private int statusCode;
    private Orders order;
    private Date orderDate;
    private double totalAmount;
    private int status;
    private OurUsers user;
    private List<OrderItem> orderItems;
    private List<Orders> orders;
}
