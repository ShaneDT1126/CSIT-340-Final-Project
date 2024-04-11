package com.csit340final.backend.service;

import com.csit340final.backend.repository.MyAdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyAdminUserDetailsService implements UserDetailsService {
    @Autowired
    MyAdminRepo myAdminRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return myAdminRepo.findByEmail(username).orElseThrow();
    }
}
