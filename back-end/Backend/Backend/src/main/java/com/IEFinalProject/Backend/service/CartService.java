package com.IEFinalProject.Backend.service;

import com.IEFinalProject.Backend.dto.CartItemDTO;
import com.IEFinalProject.Backend.dto.CartItemReqRes;
import com.IEFinalProject.Backend.dto.CartReqRes;
import com.IEFinalProject.Backend.model.Cart;
import com.IEFinalProject.Backend.model.CartItem;
import com.IEFinalProject.Backend.model.OurUsers;
import com.IEFinalProject.Backend.model.Product;
import com.IEFinalProject.Backend.repository.CartRepo;
import com.IEFinalProject.Backend.repository.UsersRepo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepo cartRepo;
    @Autowired
    private UsersRepo usersRepo;


    public CartItemReqRes getUserCart(String username){
        CartItemReqRes response = new CartItemReqRes();
        try {
            Optional<OurUsers> user = usersRepo.findByUsername(username);
            if (user.isPresent()){
                Cart cart = user.get().getCart();
                List<CartItemDTO> cartItems = new ArrayList<>();
                for (CartItem item : cart.getCartItems()){
                    CartItemDTO dto = new CartItemDTO();
                    dto.setCartItemId(item.getCartItemId());
                    dto.setProduct(item.getProduct());
                    dto.setQuantity(item.getQuantity());
                    cartItems.add(dto);
                }
                response.setCartItems(cart.getCartItems());
                response.setCart(cart);
                response.setOurUsers(user.get());
                response.setCartItemDTO(cartItems);

                response.setMessage("Cart Found Successfully!");
                response.setStatusCode(200);
            }else {
                response.setStatusCode(404);
                response.setMessage("User Not Found");
            }
        }catch (Exception e){
            response.setStatusCode(500);
            response.setError("Error getting cart: "+e.getMessage());
        }
        return response;
    }

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

    public double getTotalAmount(String username) {
        double totalAmount = 0.0;

        try {
            Optional<OurUsers> currentUser = usersRepo.findByUsername(username);
            if (currentUser.isPresent()) {
                Cart cart = currentUser.get().getCart();
                List<CartItem> cartItems = cart.getCartItems();

                for (CartItem cartItem : cartItems) {
                    Product product = cartItem.getProduct();
                    int quantity = cartItem.getQuantity();
                    double productPrice = product.getPrice();

                    totalAmount += productPrice * quantity;
                }

            }
        } catch (Exception e) {
            throw new RuntimeException();
        }

        return totalAmount;
    }
}
