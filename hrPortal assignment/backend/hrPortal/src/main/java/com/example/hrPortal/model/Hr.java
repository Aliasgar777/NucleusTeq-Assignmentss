package com.example.hrPortal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Hr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String email;
    @Column(unique = true, nullable = false)
    private String password;

    @OneToMany(mappedBy = "hr", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Employees> employees;

    public Hr(String email, List<Employees> employees, String password) {
        this.email = email;
        this.employees = employees;
        this.password = password;
    }

    public Hr() {
    }

    @Override
    public String toString() {
        return "Hr{" +
                "hrId=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", employees=" + employees +
                '}';
    }

    public int getHrId() {
        return id;
    }

    public void setHrId(int hrId) {
        this.id = hrId;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Employees> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employees> employees) {
        this.employees = employees;
    }
}
