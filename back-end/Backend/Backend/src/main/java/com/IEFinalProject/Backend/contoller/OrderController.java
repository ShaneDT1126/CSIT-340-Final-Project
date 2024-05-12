package com.IEFinalProject.Backend.contoller;

import com.IEFinalProject.Backend.dto.OrderReqRes;
import com.IEFinalProject.Backend.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {
    @Autowired
    private OrdersService ordersService;

    @PostMapping("public/addOrder/{username}")
    public ResponseEntity<OrderReqRes> addOrder(@PathVariable String username){
        return ResponseEntity.ok(ordersService.addOrder(username));
    }
}
