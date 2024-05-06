package com.IEFinalProject.Backend.dto;

import com.IEFinalProject.Backend.model.OurUsers;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReqRes {
    private int StatusCode;
    private String error;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String message;
    private String username;
    private String firstName;
    private String lastName;
    private String password;
    private String email;
    private String address;
    private String phoneNumber;
    private String role;
    private OurUsers ourUsers;
    private List<OurUsers> ourUsersList;
}
