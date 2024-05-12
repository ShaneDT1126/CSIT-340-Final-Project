package com.IEFinalProject.Backend.service;

import com.IEFinalProject.Backend.dto.OrderItemReqRes;
import com.IEFinalProject.Backend.repository.OrderItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderItemService {
    @Autowired
    private OrderItemRepo orderItemRepo;

    public OrderItemReqRes addOrderItem(OrderItemReqRes addOrderItemRequest){

        return null;
    }
}
