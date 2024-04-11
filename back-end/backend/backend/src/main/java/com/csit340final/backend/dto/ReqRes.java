package com.csit340final.backend.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReqRes {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String tokenRefresh;
    private String expirationTime;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private String password;
    private String address;
    private String phoneNum;

}
