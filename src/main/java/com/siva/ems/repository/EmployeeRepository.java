package com.siva.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.siva.ems.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{

}
