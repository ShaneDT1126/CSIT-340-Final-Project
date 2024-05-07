package com.IEFinalProject.Backend.service;

import com.IEFinalProject.Backend.dto.ReqRes;
import com.IEFinalProject.Backend.model.Cart;
import com.IEFinalProject.Backend.model.OurUsers;
import com.IEFinalProject.Backend.repository.CartRepo;
import com.IEFinalProject.Backend.repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UsersManagementService {

    @Autowired
    private UsersRepo usersRepo;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CartRepo cartRepo;

    public ReqRes register(ReqRes registrationRequest){
        ReqRes response = new ReqRes();

        try {
            Cart cart = new Cart();
            OurUsers ourUsers = new OurUsers();
            ourUsers.setUsername(registrationRequest.getUsername());
            ourUsers.setEmail(registrationRequest.getEmail());
            ourUsers.setFirstName(registrationRequest.getFirstName());
            ourUsers.setLastName(registrationRequest.getLastName());
            ourUsers.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            ourUsers.setPhoneNumber(registrationRequest.getPhoneNumber());
            ourUsers.setAddress(registrationRequest.getAddress());
            ourUsers.setCart(cart);
            ourUsers.setRole("USER");
            cart.setUser(ourUsers);
            OurUsers ourNewUser = usersRepo.save(ourUsers);
            Cart newCart = cartRepo.save(cart);
            if (ourNewUser.getId() >= 0 && newCart.getCartId() >= 0 ){
                response.setOurUsers(ourNewUser);
                response.setMessage("User Saved Successfully");
                response.setStatusCode(200);
            }

        } catch (Exception e){
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    }

    public ReqRes login(ReqRes loginRequest){
        ReqRes response = new ReqRes();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword())
            );

            var user = usersRepo.findByUsername(loginRequest.getUsername()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(),user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRole(user.getRole());
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24 Hours");
            response.setMessage("Successfully Logged In");

        } catch (Exception e){
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }

        return response;
    }

    public ReqRes refreshToken(ReqRes requestRefreshToken){
        ReqRes response = new ReqRes();

        try {
            String username = jwtUtils.extractUsername(requestRefreshToken.getToken());
            OurUsers ourUsers = usersRepo.findByUsername(username).orElseThrow();
            if (jwtUtils.isTokenValid(requestRefreshToken.getToken(), ourUsers)){
                var jwt = jwtUtils.generateToken(ourUsers);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(requestRefreshToken.getToken());
                response.setExpirationTime("24 Hours");
                response.setMessage("Successfully Refreshed Token");
            }
            response.setStatusCode(200);
            return response;

        } catch (Exception e){
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    }

    public ReqRes getAllUsers(){
        ReqRes response = new ReqRes();

        try {
            List<OurUsers> result = usersRepo.findAll();
            if (!result.isEmpty()){
                response.setOurUsersList(result);
                response.setStatusCode(200);
                response.setMessage("Successful");
            } else {
                response.setStatusCode(404);
                response.setMessage("No Users Found");
            }

        } catch (Exception e){
            response.setStatusCode(500);
            response.setError("Error Occurred: "+ e.getMessage());
        }
        return response;
    }

    public ReqRes getUserById(Integer id){
        ReqRes response = new ReqRes();

        try {
            OurUsers usersById = usersRepo.findById(id).orElseThrow(() -> new RuntimeException("User Not Found"));
            response.setOurUsers(usersById);
            response.setStatusCode(200);
            response.setMessage("User Found Successfully");
        } catch (Exception e){
            response.setStatusCode(500);
            response.setError("Error Occurred: "+ e.getMessage());
        }
        return response;
    }

    public ReqRes deleteUser (Integer id){
        ReqRes response = new ReqRes();

        try {
            Optional<OurUsers> usersOptional = usersRepo.findById(id);
            if (usersOptional.isPresent()) {
                usersRepo.deleteById(id);
                response.setStatusCode(200);
                response.setMessage("User Deleted Successfully");
            }else{
                response.setStatusCode(404);
                response.setMessage("User Not Found");
            }
        } catch (Exception e){
            response.setStatusCode(500);
            response.setError("Error Occurred: "+ e.getMessage());
        }
        return response;
    }

    public ReqRes updateUser (Integer id, OurUsers updateUserRequest){
        ReqRes response = new ReqRes();

        try {
            Optional<OurUsers> usersOptional = usersRepo.findById(id);
            if (usersOptional.isPresent()) {

                OurUsers updatedUser = usersOptional.get();
                updatedUser.setUsername(updateUserRequest.getUsername());
                updatedUser.setFirstName(updateUserRequest.getFirstName());
                updatedUser.setLastName(updateUserRequest.getLastName());
                updatedUser.setEmail(updateUserRequest.getAddress());
                updatedUser.setAddress(updateUserRequest.getAddress());
                updatedUser.setPhoneNumber(updateUserRequest.getPhoneNumber());

                if (updateUserRequest.getPassword() != null && !updateUserRequest.getPassword().isEmpty() ){
                    updatedUser.setPassword(passwordEncoder.encode(updateUserRequest.getPassword()));
                }

                OurUsers userUpdateSuccess = usersRepo.save(updatedUser);
                response.setStatusCode(200);
                response.setOurUsers(userUpdateSuccess);
                response.setMessage("User Updated Successfully");
            } else {
                response.setStatusCode(404);
                response.setMessage("User Not Found");
            }

        }catch (Exception e) {
            response.setStatusCode(500);
            response.setError("Error Occurred: "+ e.getMessage());
        }
        return response;
    }

    public ReqRes getMyInfo(String username){
        ReqRes response = new ReqRes();

        try {
            Optional<OurUsers> usersOptional = usersRepo.findByUsername(username);
            if (usersOptional.isPresent()) {
                response.setStatusCode(200);
                response.setOurUsers(usersOptional.get());
                response.setMessage("Success!");
            } else {
                response.setStatusCode(404);
                response.setMessage("User Not Found");
            }

        } catch (Exception e){
            response.setStatusCode(500);
            response.setError("Error Occurred: "+ e.getMessage());
        }

        return response;
    }

}
