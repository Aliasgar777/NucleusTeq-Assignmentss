package com.example.hrPortal.controller;

import com.example.hrPortal.model.Employees;
import com.example.hrPortal.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    @GetMapping("/employees/{id}")
    public List<Employees> getAllEmployees(@PathVariable int id){
        return service.getAllEmployees(id);
    }

    @PostMapping("/employees/{id}")
    public ResponseEntity<Employees> addEmployee(@RequestBody Employees employee, @PathVariable int id){
        return service.addEmployee(employee, id);
    }

    @PutMapping("/employees/{id}")
    public ResponseEntity<Employees> updateEmployee(@RequestBody Employees employee, @PathVariable int id){
        return service.updateEmployee(employee, id);
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable int id){
        return service.deleteEmployee(id);
    }

}
