package com.m_z.employmentsystem.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestParam;

import com.m_z.employmentsystem.entities.Compensations;
import com.m_z.employmentsystem.entities.Employee;
import com.m_z.employmentsystem.repository.EmployeeRepository;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository repository;

	public String CheckIfNull(Employee employee) {
		String response = "ok";
		if (employee.getFirstName() == null || employee.getFirstName() == "") {
			response = "First Name cant be null";
		} else if (employee.getLastName() == null || employee.getLastName() == "") {
			response = "Last Name cant be null";
		} else if (employee.getBirthDate() == null) {
			response = "select a valid date";
		} else if (employee.getPosition() == null || employee.getPosition() == "") {
			response = "position cant be null";
		}
		return response;
	}

	public String addEmployee(Employee employee) {
		int year = employee.getBirthDate().getYear() + 1900;
		String response;
		if (repository
				.findByFirstNameAndMiddleNameAndLastNameAndBirthDate(employee.getFirstName(), employee.getMiddleName(),
						employee.getLastName(), employee.getBirthDate())
				.isEmpty() && year <= Calendar.getInstance().get(Calendar.YEAR) && year > 1900) {
			repository.save(employee);
			response = "Employee Added Succesfully";
			return response;
		} else {
			if (year >= Calendar.getInstance().get(Calendar.YEAR)) {
				response = "Date cant be later than the current year";
			} else if (year < 1900) {
				response = "Date must be greater than 1900";
			} else {
				response = "Employee Already Exists";
			}
			return response;
		}
	}

	public List<Employee> findEmployee(@RequestParam("firstName") String firstName,

			@RequestParam("lastName") String lastName, @RequestParam("position") String position) {
		if (firstName != null && lastName == null && position == null) {
			return repository.findAllByFirstName(firstName);
		} else if (firstName != null && lastName != null && position == null) {
			return repository.findAllByFirstNameAndLastName(firstName, lastName);
		} else if (firstName != null && lastName == null && position != null) {
			return repository.findAllByFirstNameAndPosition(firstName, position);
		} else if (firstName != null && lastName != null && position != null) {
			return repository.findAllByFirstNameAndLastNameAndPosition(firstName, lastName, position);
		} else if (firstName == null && lastName != null && position == null) {
			return repository.findAllByLastName(lastName);
		} else if (firstName == null && lastName != null && position != null) {
			return repository.findAllByLastNameAndPosition(lastName, position);
		} else if (firstName == null && lastName == null && position != null) {
			return repository.findAllByPosition(position);
		} else {
			return null;
		}
	}

	public List<Employee> viewEmployee(@RequestParam("_id") String _id) {
		return repository.findAllBy_id(_id);
	}

	public String updateEmployee(Employee employee) {
		int year = employee.getBirthDate().getYear() + 1900;
		String response;

		if (repository.findByFirstNameAndMiddleNameAndLastNameAndBirthDate(employee.getFirstName(),
				employee.getMiddleName(), employee.getLastName(), employee.getBirthDate()).size() < 1) {
			repository.save(employee);
			response = "ok";

		} else {
			response = "Identical employee found , check the name and date fields and again";
		}
		return response;

	}

	public String patchEmployee(Employee employee) {

		repository.save(employee);
		return "ok";

	}

	public String addEmployeeCompensation(Employee employee) {
		String response = "ok";
		boolean auth = true;
		Employee e = repository.findBy_id(employee.get_id());
		List<Compensations> existingCompensations = e.getCompensations();
		List<Compensations> compensations = employee.getCompensations().subList(employee.getCompensations().size() - 1,
				employee.getCompensations().size());

		if (existingCompensations != null) {// check if theres existing compensations already
			for (Compensations ec : existingCompensations) { // iterate betwwen them to compare
				for (Compensations c : compensations) {
					switch (c.getType()) {
					case "bonus":
						if (c.getAmount() <= 0) {
							response = "amount must be greater than 0";
							auth = false;
						}
						if (c.getDescription() == null) {
							response = "description required";
							auth = false;
						}
						break;
					case "commision":
						if (c.getAmount() <= 0) {
							response = "amount must be greater than 0";
							auth = false;
						}
						if (c.getDescription() == null) {
							response = "description required";
							auth = false;
						}
						break;
					case "allowance":
						if (c.getAmount() <= 0) {
							response = "amount must be greater than 0";
							auth = false;
						}
						if (c.getDescription() == null) {
							response = "description required";
							auth = false;
						}
						break;
					case "adjustment":
						if (c.getAmount() == 0) {
							response = "amount can't be 0";
							auth = false;
						}
						if (c.getDescription() == null) {
							response = "description required";
							auth = false;
						}
						break;
					}
					if (ec.getMonth() == c.getMonth() && ec.getYear() == c.getYear()
							&& ec.getType().equalsIgnoreCase("salary") && c.getType().equalsIgnoreCase("salary")) {
						response = "you already added a salary for this month";
						auth = false;
						break;
					}
				}
			}
			if (auth == true) {
				repository.save(employee);

			}
		} else { // if theres no compensations
			for (Compensations c : compensations) {
				switch (c.getType()) {
				case "bonus":
					if (c.getAmount() <= 0) {
						response = "amount must be greater than 0";
						auth = false;
					}
					if (c.getDescription() == null) {
						response = "description required";
						auth = false;
					}
					break;
				case "commision":
					if (c.getAmount() <= 0) {
						response = "amount must be greater than 0";
						auth = false;
					}
					if (c.getDescription() == null) {
						response = "description required";
						auth = false;
					}
					break;
				case "allowance":
					if (c.getAmount() <= 0) {
						response = "amount must be greater than 0";
						auth = false;
					}
					if (c.getDescription() == null) {
						response = "description required";
						auth = false;
					}
					break;
				case "adjustment":
					if (c.getAmount() == 0) {
						response = "amount can't be 0";
						auth = false;
					}
					if (c.getDescription() == null) {
						response = "description required";
						auth = false;
					}
					break;
				}
				if (auth == true) {
					repository.save(employee);
				}

			}
		}
		return response;

	}

	public List<Compensations> viewCompensations(@RequestParam("_id") String _id, @RequestParam("startM") int startM,
			@RequestParam("startY") int startY, @RequestParam("endM") int endM, @RequestParam("endY") int endY) {

		Employee e = repository.findBy_id(_id);
		List<Compensations> compensations = e.getCompensations();
		List<Compensations> compensations_filtered = new ArrayList<Compensations>();
		int x = 0;

		for (Compensations c : compensations) {
			if (c.getYear() >= startY && c.getYear() <= endY) {
				if (c.getMonth() >= startM && c.getMonth() <= endM) {
					compensations_filtered.add(c);
					x++;
				}

			}

		}

		return compensations_filtered;
	}

	public String editEmployeeCompensation(Employee employee, @RequestParam("position") int position,
			@RequestParam("description") String description, @RequestParam("amount") double amount,
			@RequestParam("description") int year, @RequestParam("amount") int month) {
		String response = "ok";
		int count = 0;
		List<Compensations> CompensationTemp = employee.getCompensations();
		for (Compensations ec : CompensationTemp) {

			if (count == position) { // amount and desc rq
				switch (ec.getType()) {
				case "salary":
					ec.setAmount(amount);
					ec.setDescription(description);
					break;
				case "bonus":
					if (amount <= 0) {
						response = "amount must be greater than 0";
					} else if (description == null || description.isEmpty()) {
						response = "description required";
					} else {
						ec.setAmount(amount);
						ec.setDescription(description);
					}
					break;
				case "commision":
					if (amount <= 0) {
						response = "amount must be greater than 0";
					} else if (description == null || description.isEmpty()) {
						response = "description required";
					} else {
						ec.setAmount(amount);
						ec.setDescription(description);
					}
					break;
				case "allowance":
					if (amount <= 0) {
						response = "amount must be greater than 0";
					} else if (description == null || description.isEmpty()) {
						response = "description required";
					} else {
						ec.setAmount(amount);
						ec.setDescription(description);
					}
					break;
				case "adjustment":
					if (amount == 0) {
						response = "amount can't be 0";
					} else if (description == null || description.isEmpty()) {
						response = "description required";
					} else {
						ec.setAmount(amount);
						ec.setDescription(description);
					}
					break;
				}

			}
			count++;

		}
		employee.setCompensations(CompensationTemp);
		repository.save(employee);
		return response;
	}
}
