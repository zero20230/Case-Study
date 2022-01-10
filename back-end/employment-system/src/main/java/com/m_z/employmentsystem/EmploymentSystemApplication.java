package com.m_z.employmentsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.m_z.employmentsystem.repository.EmployeeRepository;

@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
@EnableMongoRepositories(basePackageClasses = { EmployeeRepository.class, })
@ComponentScan("com.m_z.*")

public class EmploymentSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmploymentSystemApplication.class, args);
	}

}
