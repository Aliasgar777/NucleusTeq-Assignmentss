package com.example.hrPortal.repo;

import com.example.hrPortal.model.Hr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HrRepo extends JpaRepository<Hr, Integer> {
    Hr findByEmailAndPassword(String email, String password);
}
