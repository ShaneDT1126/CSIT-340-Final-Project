package com.IEFinalProject.Backend.controller;

import com.IEFinalProject.Backend.config.paypal.PaypalService;
import com.IEFinalProject.Backend.service.PaymentService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PaymentController {
    private final PaypalService paypalService;

    @GetMapping("/")
    public String home(){
        return "index";
    }

    @PostMapping("auth/payment/create/{username}/{total}")
    public String createPayment(@PathVariable String username, @PathVariable double total) {

        try {
            String cancelUrl = "http://localhost:5173/payment/cancel";
            String successUrl = "http://localhost:5173/payment/success";
            Payment payment = paypalService.createPayment(
                    total,
                    "PHP",
                    "paypal",
                    "sale",
                    "CLICK. Discover the Ultimate Hub for School Style",
                    cancelUrl,
                    successUrl
            );

            for (Links links: payment.getLinks()){
                if (links.getRel().equals("approval_url")){
                    return links.getHref();
                }
            }
        } catch (PayPalRESTException e){
            log.error("Error occured:: ", e);
        }
        return "localhost:5173/"+username+"/payment/error";
    }

    @GetMapping("auth/payment/success")
    public String paymentSuccess(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId){
        try {
            Payment payment = paypalService.executePayment(paymentId, payerId);
            if (payment.getState().equals("approved")){
                return "paymentSuccess";
            }
        } catch (PayPalRESTException e){
            log.error("Error occured:: ", e);
        }
        return "paymentSuccess";
    }

    @GetMapping("auth/payment/cancel")
    public String paymentCancel(){
        return "paymentCancel";
    }

    @GetMapping("auth/payment/error")
    public String paymentError(){
        return "paymentError";
    }
}
