package com.IEFinalProject.Backend.service;

import com.IEFinalProject.Backend.dto.OrderReqRes;
import com.IEFinalProject.Backend.model.*;
import com.IEFinalProject.Backend.repository.*;
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
    @Autowired
    private CartRepo cartRepo;

    @Transactional
    public OrderReqRes addOrder(String username){
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
                    cart.getCartItems().clear();
                    cartRepo.save(cart);
                    response.setStatusCode(200);
                    response.setMessage("Order Successful");
                    response.setOrder(newOrder);
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

    public OrderReqRes getAllOrders(){
        OrderReqRes response = new OrderReqRes();

        try {
            List<Orders> orders = orderRepo.findAll();
            if (!orders.isEmpty()){
                response.setStatusCode(200);
                response.setOrders(orders);
                response.setMessage("All Orders Found Successful");
            }else {
                response.setStatusCode(404);
                response.setMessage("No Orders Found");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Occurred: "+ e.getMessage());
        }

        return response;
    }

    @Transactional
    public OrderReqRes changeOrderStatusApprove(Integer orderId){
        OrderReqRes response = new OrderReqRes();

        try {
            Optional<Orders> order = orderRepo.findById(orderId);
            if (order.isPresent()){
                Orders statusUpdated = order.get();
                statusUpdated.setStatus(1);
                response.setOrder(statusUpdated);
                response.setMessage("Status Approved");
                response.setStatusCode(200);
            }else {
                response.setStatus(404);
                response.setMessage("Order not found");
            }
        } catch (Exception e){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            response.setStatusCode(500);
            response.setMessage("Error Occurred: " +e.getMessage());
        }
        return response;
    }

    public OrderReqRes getOrderDetails(Integer orderId){
        OrderReqRes response = new OrderReqRes();

        try {
            Optional<Orders> order = orderRepo.findById(orderId);
            if (order.isPresent()){
                response.setOrder(order.get());
                response.setStatusCode(200);
                response.setMessage("Order Details Found Successfully!");
            }else {
                response.setStatusCode(404);
                response.setMessage("Order Details Not Found Successfully");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Occurred: " +e.getMessage());
        }

        return response;
    }

    public OrderReqRes getOrderIfStatusNotApprove(){
        OrderReqRes response = new OrderReqRes();

        try {
            List<Orders> orders = orderRepo.findByStatus(0);
            if (!orders.isEmpty()){
                response.setOrders(orders);
                response.setStatus(200);
                response.setMessage("Orders with not approved status");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Occurred: " +e.getMessage());
        }

        return response;
    }

}
