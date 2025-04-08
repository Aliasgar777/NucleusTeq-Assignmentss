package com.example.hrPortal.service;

import com.example.hrPortal.model.Employees;
import com.example.hrPortal.model.Hr;
import com.example.hrPortal.repo.EmployeesRepo;
import com.example.hrPortal.repo.HrRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeesRepo repo;

    @Autowired
    private HrRepo hrRepo;

    public List<Employees> getAllEmployees(int id) {
        Hr hr = hrRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("HR not found with id: " + id));
        return hr.getEmployees();
    }

    public ResponseEntity<Employees> addEmployee(Employees employee ,int id){
        Hr hr = hrRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("HR not found with id: " + id));

        employee.setHr(hr);
        return new ResponseEntity<>(repo.save(employee), HttpStatus.OK);
    }

    public ResponseEntity<Employees> updateEmployee(Employees employees, int id){
        Employees oldEmployee = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));

        oldEmployee.setEmployeeName(employees.getEmployeeName());
        oldEmployee.setDepartment(employees.getDepartment());
        oldEmployee.setSalary(employees.getSalary());
        oldEmployee.setEmail(employees.getEmail());

        repo.save(oldEmployee);

        return new ResponseEntity<>(oldEmployee, HttpStatus.OK);
    }

    public ResponseEntity<String> deleteEmployee(int id){
        Employees oldEmployee = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));

        Hr hr = oldEmployee.getHr();
        hr.getEmployees().removeIf(emp -> emp.getEmployeeId() == id);
        hrRepo.save(hr);

        repo.deleteById(id);
        return ResponseEntity.ok("employee deleted successfully");
    }
}
