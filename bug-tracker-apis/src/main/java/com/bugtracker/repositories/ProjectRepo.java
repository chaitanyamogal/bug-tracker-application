package com.bugtracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bugtracker.entities.Company;
import com.bugtracker.entities.Project;
import com.bugtracker.entities.User;

public interface ProjectRepo extends JpaRepository<Project, Integer> {
	List<Project> findByCompany(Company company);
	List<Project> findByUser(User user);
}
