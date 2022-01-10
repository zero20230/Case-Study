package com.m_z.employmentsystem.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.m_z.employmentsystem.entities.Employee;

@Repository
public interface EmployeeRepository extends MongoRepository<Employee, String> {

	public List<Employee> findByFirstNameAndMiddleNameAndLastNameAndBirthDate(String firstName, String middleName,
			String lastName, Date birthDate);

	public List<Employee> findAllByFirstName(String firstName);

	public List<Employee> findAllBy_id(String _id);

	public Employee findBy_id(String _id);

	public List<Employee> findAllByLastName(String lastName);

	public List<Employee> findAllByPosition(String position);

	public List<Employee> findAllByFirstNameAndPosition(String firstnName, String position);

	public List<Employee> findAllByLastNameAndPosition(String lastName, String position);

	public List<Employee> findAllByFirstNameAndLastName(String firstName, String lastName);

	public List<Employee> findAllByFirstNameAndLastNameAndPosition(String firstName, String lastName, String position);

}
