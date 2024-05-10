package com.IEFinalProject.Backend.service;

import com.IEFinalProject.Backend.dto.OrderReqRes;
import com.IEFinalProject.Backend.repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrdersService {
    @Autowired
    private OrderRepo orderRepo;

    public OrderReqRes addOrder(OrderReqRes orderRequest){

        return null;
    }


}
