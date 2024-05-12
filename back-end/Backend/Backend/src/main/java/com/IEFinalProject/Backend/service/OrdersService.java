package com.IEFinalProject.Backend.service;

import com.IEFinalProject.Backend.dto.OrderReqRes;
import com.IEFinalProject.Backend.model.*;
import com.IEFinalProject.Backend.repository.CartItemRepo;
import com.IEFinalProject.Backend.repository.OrderRepo;
import com.IEFinalProject.Backend.repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrdersService {
    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private CartService cartService;
    @Autowired
    private UsersRepo usersRepo;
    @Autowired
    private CartItemService cartItemService;


    public OrderReqRes addOrder(OrderReqRes orderRequest, String username){
        OrderReqRes response = new OrderReqRes();
        try {
            Optional<OurUsers> currentUser = usersRepo.findByUsername(username);
            if (currentUser.isPresent()){
                Orders order = new Orders();
                Cart cart = currentUser.get().getCart();
                List<CartItem> cartItems = cart.getCartItems();
                order.setOrderDate(orderRequest.getOrderDate());
                order.setTotalAmount(cartService.getTotalAmount(username));
                order.setStatus(orderRequest.getStatus());
                order.setOrderItems(orderRequest.getOrderItems());
                order.setStatus(0);
                Orders newOrder = orderRepo.save(order);
            }
        } catch (Exception e) {

        }

        return null;
    }


}
