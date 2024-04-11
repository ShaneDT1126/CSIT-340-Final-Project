package com.csit340final.backend.service;

import com.csit340final.backend.repository.MyUsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUsersUserDetailsService implements UserDetailsService {

    @Autowired
    MyUsersRepo myUsersRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return myUsersRepo.findByEmail(username).orElseThrow();
    }
}
