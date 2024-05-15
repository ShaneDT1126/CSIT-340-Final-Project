package com.IEFinalProject.Backend.controller;

import com.IEFinalProject.Backend.dto.ReqRes;
import com.IEFinalProject.Backend.model.OurUsers;
import com.IEFinalProject.Backend.service.UsersManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserManagementController {
    @Autowired
    private UsersManagementService usersManagementService;

    @PostMapping("/auth/userRegister")
    public ResponseEntity<ReqRes> userRegisterRequest(@RequestBody ReqRes registerRequest){
        return ResponseEntity.ok(usersManagementService.userRegister(registerRequest));
    }

    @PostMapping("/auth/adminRegister")
    public ResponseEntity<ReqRes> adminRegisterRequest(@RequestBody ReqRes registerRequest){
        return ResponseEntity.ok(usersManagementService.adminRegister(registerRequest));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<ReqRes> loginRequest(@RequestBody ReqRes loginRequest){
        return ResponseEntity.ok(usersManagementService.login(loginRequest));
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<ReqRes> refreshTokenRequest(@RequestBody ReqRes refreshTokenRequest){
        return ResponseEntity.ok(usersManagementService.refreshToken(refreshTokenRequest));
    }

    @GetMapping("/admin/get-all-users")
    public ResponseEntity<ReqRes> getAllUsersRequest(){
        return ResponseEntity.ok(usersManagementService.getAllUsers());
    }

    @GetMapping("/admin/get-user/{userId}")
    public ResponseEntity<ReqRes> getUserByIdRequest(@PathVariable Integer userId){
        return ResponseEntity.ok(usersManagementService.getUserById(userId));
    }

    @PutMapping("/admin/update/{userId}")
    public ResponseEntity<ReqRes> updateUserRequest(@PathVariable Integer userId, @RequestBody OurUsers updateRequest){
        return ResponseEntity.ok(usersManagementService.updateUser(userId, updateRequest));
    }

    @GetMapping("/adminuser/get-profile")
    public ResponseEntity<ReqRes> getProfileRequest(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        ReqRes response = usersManagementService.getMyInfo(username);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<ReqRes> deleteUserRequest(@PathVariable Integer userId){
        return ResponseEntity.ok(usersManagementService.deleteUser(userId));
    }
}
