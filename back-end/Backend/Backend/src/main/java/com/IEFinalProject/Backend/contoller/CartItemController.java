package com.IEFinalProject.Backend.contoller;

import com.IEFinalProject.Backend.dto.CartItemReqRes;
import com.IEFinalProject.Backend.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CartItemController {
    @Autowired
    private CartItemService cartItemService;

    @PostMapping("/public/addToCart/{username}/{productId}")
    public ResponseEntity<CartItemReqRes> addToCartItem(@RequestBody CartItemReqRes request, @PathVariable String username, @PathVariable Integer productId){
        return ResponseEntity.ok(cartItemService.addCartItem(request,productId,username));
    }

    @DeleteMapping("/public/deleteCartItem/{cartId}")
    public ResponseEntity<CartItemReqRes> deleteCartItem(@PathVariable Integer cartId){
        return ResponseEntity.ok(cartItemService.deleteCartItem(cartId));
    }
}
