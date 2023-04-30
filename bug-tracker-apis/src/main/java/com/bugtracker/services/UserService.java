package com.bugtracker.services;

import java.util.List;

import com.bugtracker.payloads.UserDto;

public interface UserService {

	List<UserDto> getAllUsers();

	UserDto getUserById(Integer userId);

	UserDto createUser(UserDto userDto, Integer roleId);

	UserDto updateUser(UserDto user, Integer userId);

	void deleteUser(Integer userId);

	List<UserDto> findUsersByProject(Integer projectId);

	List<UserDto> findUsersByCompany(Integer company);

	UserDto assignCompanyToUser(Integer userId, Integer companyId);

	UserDto assignProjectToUser(Integer userId, Integer projectId);

}
