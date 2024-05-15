package com.IEFinalProject.Backend.repository;

import com.IEFinalProject.Backend.dto.PaymentReqRes;
import com.IEFinalProject.Backend.model.Orders;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepo{
    public PaymentReqRes createPaymentLink(Orders orders);
}
