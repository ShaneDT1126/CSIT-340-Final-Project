package com.IEFinalProject.Backend.service;

import com.IEFinalProject.Backend.dto.CartReqRes;
import com.IEFinalProject.Backend.model.Cart;
import com.IEFinalProject.Backend.model.CartItem;
import com.IEFinalProject.Backend.model.OurUsers;
import com.IEFinalProject.Backend.repository.CartRepo;
import com.IEFinalProject.Backend.repository.UsersRepo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepo cartRepo;
    @Autowired
    private UsersRepo usersRepo;


    //@JsonIgnoreProperties({"cart_item","cart","ourUsers"})
    public CartReqRes getCart(String username){
        CartReqRes response = new CartReqRes();

        try {
            Optional<OurUsers> currentUser = usersRepo.findByUsername(username);
           if (currentUser.isPresent()){
               Cart cart = currentUser.get().getCart();
               CartReqRes dto = new CartReqRes();
               dto.setCart(cart);
               dto.setCartItems(cart.getCartItems());
               response.setCart(dto.getCart());
               response.setMessage("Cart found successfully");
               response.setStatusCode(200);
           }else {
               response.setStatusCode(404);
               response.setMessage("Cart Not Found");
           }
        } catch (Exception e)
        {
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }

        return response;
    }

    public Double getTotalAmount(String username){
        Optional<OurUsers> users = usersRepo.findByUsername(username);


        return null;
    }
}
