package com.example.hrPortal.controller;

import com.example.hrPortal.model.Hr;
import com.example.hrPortal.repo.HrRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HrController {

    @Autowired
    private HrRepo hrRepo;


    @PostMapping("/login")
    public ResponseEntity<Hr> login(@RequestBody Hr loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Hr hr = hrRepo.findByEmailAndPassword(email, password);

        if (hr != null) {
            return ResponseEntity.ok(hr); // returns HR object with ID
        }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

    }
}
