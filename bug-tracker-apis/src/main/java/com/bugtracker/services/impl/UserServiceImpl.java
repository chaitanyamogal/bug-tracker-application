package com.bugtracker.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bugtracker.entities.Company;
import com.bugtracker.entities.Project;
import com.bugtracker.entities.User;
import com.bugtracker.entities.UserRole;
import com.bugtracker.exceptions.ResourceNotFoundException;
import com.bugtracker.payloads.UserDto;
import com.bugtracker.repositories.CompanyRepo;
import com.bugtracker.repositories.ProjectRepo;
import com.bugtracker.repositories.UserRepo;
import com.bugtracker.repositories.UserRoleRepo;
import com.bugtracker.services.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	ModelMapper modelMapper;

	@Autowired
	UserRepo userRepo;

	@Autowired
	CompanyRepo companyRepo;

	@Autowired
	ProjectRepo projectRepo;

	@Autowired
	UserRoleRepo userRoleRepo;

	@Override
	public List<UserDto> getAllUsers() {
		List<User> users = this.userRepo.findAll();
		List<UserDto> allUsers = users.stream().map((user) -> this.modelMapper.map(user, UserDto.class))
				.collect(Collectors.toList());
		return allUsers;
	}

	@Override
	public UserDto getUserById(Integer userId) {
		User user = this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));

		return this.modelMapper.map(user, UserDto.class);
	}

	@Override
	public UserDto createUser(UserDto userDto, Integer roleId) {
		// Company company = this.companyRepo.findById(companyId).orElseThrow(() -> new
		// ResourceNotFoundException("Company", "Company id", companyId));
		UserRole userRole = this.userRoleRepo.findById(roleId)
				.orElseThrow(() -> new ResourceNotFoundException("UserRole not found"));
		;
		User user = this.modelMapper.map(userDto, User.class);
		user.setUserRole(userRole);
		User savedUser = this.userRepo.save(user);
		return this.modelMapper.map(savedUser, UserDto.class);
	}

	@Override
	public UserDto updateUser(UserDto user, Integer userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteUser(Integer userId) {
		// TODO Auto-generated method stub

	}

	@Override
	public List<UserDto> findUsersByProject(Integer projectId) {
		Project project = this.projectRepo.findById(projectId)
				.orElseThrow(() -> new ResourceNotFoundException("Project not found"));
		List<User> usersOfProject = userRepo.findByProject(project);
		List<UserDto> allUsers = usersOfProject.stream().map((user) -> this.modelMapper.map(user, UserDto.class))
				.collect(Collectors.toList());
		return allUsers;
	}

	@Override
	public List<UserDto> findUsersByCompany(Integer companyId) {
		Company company = this.companyRepo.findById(companyId)
				.orElseThrow(() -> new ResourceNotFoundException("Company not found"));
		List<User> usersOfCompany = userRepo.findByCompany(company);
		List<UserDto> allUsers = usersOfCompany.stream().map((user) -> this.modelMapper.map(user, UserDto.class))
				.collect(Collectors.toList());
		return allUsers;
	}

	@Override
	public UserDto assignCompanyToUser(Integer userId, Integer companyId) {
		User user = this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
		Company company = this.companyRepo.findById(companyId)
				.orElseThrow(() -> new ResourceNotFoundException("Company not found"));
		// User user = this.modelMapper.map(userDto, User.class);
		user.setCompany(company);
		User savedUser = this.userRepo.save(user);
		return this.modelMapper.map(savedUser, UserDto.class);
	}

	public UserDto assignProjectToUser(Integer userId, Integer projectId) {
		List<Project> projectsList = new ArrayList<>();
		User user = this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
		Project project = this.projectRepo.findById(projectId)
				.orElseThrow(() -> new ResourceNotFoundException("Project not found"));

		projectsList = user.getProject();
		projectsList.add(project);
		user.setProject(projectsList);
		User savedUser = this.userRepo.save(user);
		return this.modelMapper.map(savedUser, UserDto.class);
	}

}
