package com.siva.ems.mapper;

import com.siva.ems.dto.EmployeeDto;
import com.siva.ems.entity.Employee;

public class EmployeeMapper {
	/*
	 * This method is used to map Employee to EmployeeDto.
	 */
	public static EmployeeDto mapToEmployeeDto(Employee employee) {

		return new EmployeeDto(employee.getId(), employee.getFirstName(), employee.getLastName(), employee.getEmail());
	}

	/*
	 * This method is used to map EmployeeDto to Employee.
	 */
	public static Employee mapToEmployee(EmployeeDto employeeDto) {

		return new Employee(employeeDto.getId(), employeeDto.getFirstName(), employeeDto.getLastName(),
				employeeDto.getEmail());
	}

}
