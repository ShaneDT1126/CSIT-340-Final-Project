package com.IEFinalProject.Backend.repository;

import com.IEFinalProject.Backend.model.OurUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepo extends JpaRepository<OurUsers,Integer> {

    Optional<OurUsers> findByUsername(String username);
}
