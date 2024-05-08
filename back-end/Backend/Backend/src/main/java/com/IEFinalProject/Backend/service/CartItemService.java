package com.IEFinalProject.Backend.service;

import com.IEFinalProject.Backend.dto.CartItemReqRes;
import com.IEFinalProject.Backend.model.Cart;
import com.IEFinalProject.Backend.model.CartItem;
import com.IEFinalProject.Backend.model.OurUsers;
import com.IEFinalProject.Backend.model.Product;
import com.IEFinalProject.Backend.repository.CartItemRepo;
import com.IEFinalProject.Backend.repository.CartRepo;
import com.IEFinalProject.Backend.repository.ProductRepo;
import com.IEFinalProject.Backend.repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CartItemService {
    @Autowired
    private CartItemRepo cartItemRepo;
    @Autowired
    private UsersRepo usersRepo;
    @Autowired
    private ProductRepo productRepo;

    @Transactional
    public CartItemReqRes addCartItem (CartItemReqRes addToCartRequest,Integer productId, String username){
        CartItemReqRes response = new CartItemReqRes();

        try {
            Optional<OurUsers> user = usersRepo.findByUsername(username);
            Optional<Product> product = productRepo.findById(productId);

            if (user.isPresent() && product.isPresent()) {
                CartItem cartItem = new CartItem();
                cartItem.setCart(user.get().getCart());
                cartItem.setProduct(product.get());
                cartItem.setQuantity(addToCartRequest.getQuantity());
                CartItem newCartItem = cartItemRepo.save(cartItem);
                if (newCartItem.getCartItemId() >= 0) {
                    response.setMessage("Added to Cart Successfully");
                    response.setStatusCode(200);
                }
            } else {
                response.setStatusCode(404);
                response.setMessage("No Users Found");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }

        return response;
    }
}
