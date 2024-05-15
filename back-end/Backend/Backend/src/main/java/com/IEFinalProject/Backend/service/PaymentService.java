package com.IEFinalProject.Backend.service;

import com.IEFinalProject.Backend.dto.PaymentReqRes;
import com.IEFinalProject.Backend.model.Orders;
import com.IEFinalProject.Backend.repository.PaymentRepo;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class PaymentService implements PaymentRepo {

    @Value("${stripe.api.key}")
    private String stripePrivateKey;

    @Override
    public PaymentReqRes createPaymentLink(Orders orders) throws StripeException {

        Stripe.apiKey=stripePrivateKey;

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.ACSS_DEBIT)
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.ALIPAY)
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.GRABPAY)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("localhost:5173/")
                .setCancelUrl("localhost:5173/")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("php")
                                .setUnitAmount( (long) orders.getTotalAmount()*100)
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName("Click Products")
                                        .build()
                                ).build()
                        ).build()
                ).build();

        Session session = Session.create(params);

        PaymentReqRes response = new PaymentReqRes();
        response.setPayment_url(session.getUrl());

        return response;
    }
}
