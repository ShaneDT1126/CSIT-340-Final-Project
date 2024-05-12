package com.IEFinalProject.Backend.service;

import com.IEFinalProject.Backend.dto.OrderReqRes;
import com.IEFinalProject.Backend.model.*;
import com.IEFinalProject.Backend.repository.CartItemRepo;
import com.IEFinalProject.Backend.repository.OrderItemRepo;
import com.IEFinalProject.Backend.repository.OrderRepo;
import com.IEFinalProject.Backend.repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.ArrayList;
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
    private OrderItemRepo orderItemRepo;

    @Transactional
    public OrderReqRes addOrder( String username){
        OrderReqRes response = new OrderReqRes();

        try {
            Optional<OurUsers> currentUser = usersRepo.findByUsername(username);
            if (currentUser.isPresent()){
                Orders order = new Orders();
                Cart cart = currentUser.get().getCart();
                List<CartItem> cartItems = cart.getCartItems();
                List<OrderItem> orderItems = new ArrayList<>();

                order.setOurUsers(currentUser.get());
                order.setOrderDate(new Date());
                order.setTotalAmount(cartService.getTotalAmount(username));
                order.setStatus(0);
                for (CartItem cartItem: cartItems){
                    OrderItem orderItem = new OrderItem();
                    orderItem.setProduct(cartItem.getProduct());
                    orderItem.setQuantity(cartItem.getQuantity());
                    orderItem.setPrice(cartItem.getProduct().getPrice());
                    orderItem.setOrders(order);

                    orderItems.add(orderItem);
                    orderItemRepo.save(orderItem);
                }

                order.setOrderItems(orderItems);

                Orders newOrder = orderRepo.save(order);
                if (newOrder.getOrderId() >= 0){
                    response.setStatusCode(200);
                    response.setMessage("Order Successful");
                    response.setOrders(newOrder);
                }
            }else {
                response.setStatus(404);
                response.setMessage("Not Found");
            }
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            response.setStatusCode(500);
            response.setMessage("Error Occured: " +e.getMessage());
        }

        return response;
    }


}
