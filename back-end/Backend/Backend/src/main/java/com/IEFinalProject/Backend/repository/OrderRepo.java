package com.IEFinalProject.Backend.repository;

import com.IEFinalProject.Backend.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Orders,Integer> {
    List<Orders>findByStatus(int status);
}
