package com.IEFinalProject.Backend.dto;

import com.IEFinalProject.Backend.model.Orders;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderReqRes {
    private String message;
    private String error;
    private int statusCode;
    private Orders orders;
    private Date orderDate;
    private double totalAmount;
    private int status;
}
