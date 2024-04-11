package com.csit340final.backend.repository;

import com.csit340final.backend.models.MyUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MyUsersRepo extends JpaRepository<MyUsers, Long> {
    Optional<MyUsers> findByEmail(String email);

}
