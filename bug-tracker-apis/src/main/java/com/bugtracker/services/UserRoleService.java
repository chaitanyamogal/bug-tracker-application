package com.bugtracker.services;

import java.util.List;

import com.bugtracker.payloads.UserRoleDto;

public interface UserRoleService {

	List<UserRoleDto> getAllRoles();

	UserRoleDto createUserRole(UserRoleDto userRole);

	void deleteUserRole(Integer roleId);
}
