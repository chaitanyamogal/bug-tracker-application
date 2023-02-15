package com.bugtracker.services;

import java.util.List;

import com.bugtracker.entities.Company;
import com.bugtracker.payloads.UserDto;

public interface UserService {

	List<UserDto> getAllUsers();

	UserDto getUserById(Integer userId);

	UserDto createUser(UserDto user);

	UserDto updateUser(UserDto user, Integer userId);

	void deleteUser(Integer userId);

	List<UserDto> findUsersByCompany(Integer company);
	
	UserDto assignCompanyToUser(Integer userId, Integer companyId);

	UserDto assignProjectToUser(Integer userId, Integer projectId);



}
