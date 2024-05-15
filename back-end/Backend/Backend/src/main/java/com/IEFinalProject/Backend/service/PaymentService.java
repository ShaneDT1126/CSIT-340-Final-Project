package com.IEFinalProject.Backend.service;

import com.IEFinalProject.Backend.dto.PaymentReqRes;
import com.IEFinalProject.Backend.model.Orders;
import com.IEFinalProject.Backend.repository.PaymentRepo;
import com.stripe.Stripe;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class PaymentService implements PaymentRepo {

    @Value("${stripe.api.key}")
    private String stripePrivateKey;

    @Override
    public PaymentReqRes createPaymentLink(Orders orders) {

//        Stripe.apiKey=stripePrivateKey;
//
//        SessionCreateParams params = SessionCreateParams.builder()
//                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
//                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.ACSS_DEBIT)
//                .addPaymentMethodType(SessionCreateParams)
//
//                .build();

        return null;
    }
}
