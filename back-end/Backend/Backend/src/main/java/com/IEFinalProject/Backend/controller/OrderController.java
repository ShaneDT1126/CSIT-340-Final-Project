package com.IEFinalProject.Backend.controller;

import com.IEFinalProject.Backend.dto.OrderReqRes;
import com.IEFinalProject.Backend.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class OrderController {
    @Autowired
    private OrdersService ordersService;

    @PostMapping("public/addOrder/{username}")
    public ResponseEntity<OrderReqRes> addOrder(@PathVariable String username){
        return ResponseEntity.ok(ordersService.addOrder(username));
    }

    @GetMapping("public/getAllOrders")
    public ResponseEntity<OrderReqRes> getAllOrders(){
        return ResponseEntity.ok(ordersService.getAllOrders());
    }

    @PutMapping("public/updateStatusToApprove/{orderId}")
    public ResponseEntity<OrderReqRes> updateStatusToApprove(@PathVariable Integer orderId){
        return ResponseEntity.ok(ordersService.changeOrderStatusApprove(orderId));
    }

    @GetMapping("public/getOrderDetails/{orderId}")
    public ResponseEntity<OrderReqRes> getOrderDetails(@PathVariable Integer orderId){
        return ResponseEntity.ok(ordersService.getOrderDetails(orderId));
    }
}