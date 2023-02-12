package com.bugtracker.services;

import java.util.List;

import com.bugtracker.payloads.UserDto;

public interface UserService {

	List<UserDto> getAllUsers();

	UserDto getUserById(Integer userId);

	UserDto createUser(UserDto user);

	UserDto updateCompany(Integer userId, Integer companyId);

	UserDto updateProject(Integer userId, Integer projectId);

	UserDto updateUser(UserDto user, Integer userId);

	void deleteUser(Integer userId);

}
