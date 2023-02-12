package com.bugtracker.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bugtracker.entities.Company;
import com.bugtracker.entities.Project;
import com.bugtracker.entities.User;
import com.bugtracker.exceptions.ResourceNotFoundException;
import com.bugtracker.payloads.UserDto;
import com.bugtracker.repositories.CompanyRepo;
import com.bugtracker.repositories.ProjectRepo;
import com.bugtracker.repositories.UserRepo;
import com.bugtracker.services.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepo userRepo;

	@Autowired
	CompanyRepo companyRepo;

	@Autowired
	ProjectRepo projectRepo;

	@Autowired
	ModelMapper modelMapper;

	@Override
	public List<UserDto> getAllUsers() {
		List<User> users = this.userRepo.findAll();
		List<UserDto> allUsers = users.stream().map((user) -> this.modelMapper.map(user, UserDto.class))
				.collect(Collectors.toList());
		return allUsers;
	}

	@Override
	public UserDto getUserById(Integer userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UserDto createUser(UserDto userDto) {
		// Company company = this.companyRepo.findById(companyId).orElseThrow(() -> new
		// ResourceNotFoundException("Company", "Company id", companyId));
		User user = this.modelMapper.map(userDto, User.class);
		// user.setCompany(company);
		User savedUser = this.userRepo.save(user);
		return this.modelMapper.map(savedUser, UserDto.class);
	}

	@Override
	public UserDto updateCompany(Integer userId, Integer companyId) {
		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "User id", userId));
		Company company = this.companyRepo.findById(companyId)
				.orElseThrow(() -> new ResourceNotFoundException("Company", "Company id", companyId));
		// User user = this.modelMapper.map(userDto, User.class);
		user.setCompany(company);
		User savedUser = this.userRepo.save(user);
		return this.modelMapper.map(savedUser, UserDto.class);
	}

	public UserDto updateProject(Integer userId, Integer projectId) {
		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "User id", userId));
		Project project = this.projectRepo.findById(projectId)
				.orElseThrow(() -> new ResourceNotFoundException("Project", "Project id", projectId));

		user.setProject(project);
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

}
