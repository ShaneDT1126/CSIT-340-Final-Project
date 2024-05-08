package com.IEFinalProject.Backend.contoller;

import com.IEFinalProject.Backend.dto.CartItemReqRes;
import com.IEFinalProject.Backend.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CartItemController {
    @Autowired
    private CartItemService cartItemService;

    @PostMapping("/public/addToCart/{username}/{productId}")
    public ResponseEntity<CartItemReqRes> addToCartItem(@RequestBody CartItemReqRes request, @PathVariable String username, @PathVariable Integer productId){
        return ResponseEntity.ok(cartItemService.addCartItem(request,productId,username));
    }
}
