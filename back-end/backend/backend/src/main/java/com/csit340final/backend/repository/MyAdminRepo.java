package com.csit340final.backend.repository;

import com.csit340final.backend.models.MyAdmin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MyAdminRepo extends JpaRepository<MyAdmin, Long> {
    Optional<MyAdmin> findByEmail(String email);

}
