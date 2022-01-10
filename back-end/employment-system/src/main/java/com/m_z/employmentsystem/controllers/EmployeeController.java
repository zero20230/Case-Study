package com.m_z.employmentsystem.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.m_z.employmentsystem.entities.Compensations;
import com.m_z.employmentsystem.entities.Employee;
import com.m_z.employmentsystem.service.EmployeeService;

@RestController
@CrossOrigin
@RequestMapping("/api/employee")
public class EmployeeController {

	@Autowired
	EmployeeService employeeService;

	@PostMapping("/add")
	public String addEmployee(@RequestBody Employee employee) {
		if (employeeService.CheckIfNull(employee) == "ok") {
			return employeeService.addEmployee(employee);
		} else {
			return employeeService.CheckIfNull(employee);
		}

	}

	@GetMapping("/find")
	public List<Employee> findEmployee(@RequestParam(required = false, name = "firstName") String firstName,
			@RequestParam(required = false, name = "lastName") String lastName,
			@RequestParam(required = false, name = "position") String position) {
		return employeeService.findEmployee(firstName, lastName, position);
	}

	@GetMapping("/view")
	public List<Employee> findEmployee(@RequestParam(required = false, name = "_id") String _id) {
		return employeeService.viewEmployee(_id);
	}

	@PutMapping("/update")
	public String updateEmployee(@RequestBody Employee employee) {
		if (employeeService.CheckIfNull(employee) == "ok") {
			return employeeService.updateEmployee(employee);
		} else {
			return employeeService.CheckIfNull(employee);
		}

	}

	@PatchMapping("/patch")
	public String patchEmployee(@RequestBody Employee employee) {
		if (employeeService.CheckIfNull(employee) == "ok") {
			return employeeService.patchEmployee(employee);
		} else {
			return employeeService.CheckIfNull(employee);
		}

	}

	@PutMapping("/addCompensation")
	public String addEmployeeCompensation(@RequestBody Employee employee) {

		return employeeService.addEmployeeCompensation(employee);

	}

	@GetMapping("/viewCompensation")
	public List<Compensations> findEmployee(@RequestParam(required = false, name = "_id") String _id,
			@RequestParam(required = false, name = "startM") int startM,
			@RequestParam(required = false, name = "startY") int startY,
			@RequestParam(required = false, name = "endM") int endM,
			@RequestParam(required = false, name = "endY") int endY) {
		return employeeService.viewCompensations(_id, startM, startY, endM, endY);
	}

	@PutMapping("/editCompensation")
	public String editCompensation(@RequestBody Employee employee,
			@RequestParam(required = false, name = "position") int position,
			@RequestParam(required = false, name = "description") String description,
			@RequestParam(required = false, name = "amount") double amount,
			@RequestParam(required = false, name = "year") int year,
			@RequestParam(required = false, name = "month") int month) {
		return employeeService.editEmployeeCompensation(employee, position, description, amount, year, month);

	}
}
