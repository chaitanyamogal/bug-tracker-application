package com.bugtracker.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bugtracker.entities.Company;
import com.bugtracker.entities.Project;
import com.bugtracker.entities.User;

public interface UserRepo extends JpaRepository<User, Integer>{
	List<Project> findByUserId(User userId);
	List<User> findByProject(Project projectId);
	List<User> findByCompany(Company company);
	Optional<User> findByEmail(String email);
}
