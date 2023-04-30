package com.bugtracker.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bugtracker.entities.UserRole;
import com.bugtracker.payloads.UserRoleDto;
import com.bugtracker.repositories.UserRoleRepo;
import com.bugtracker.services.UserRoleService;

@Service
public class UserRoleServiceImpl implements UserRoleService {

	@Autowired
	ModelMapper modelMapper;

	@Autowired
	UserRoleRepo userRoleRepo;

	@Override
	public List<UserRoleDto> getAllRoles() {
		List<UserRole> userRoles = this.userRoleRepo.findAll();
		List<UserRoleDto> userRoleDtos = userRoles.stream()
				.map((userRole) -> this.modelMapper.map(userRole, UserRoleDto.class)).collect(Collectors.toList());
		return userRoleDtos;
	}

	@Override
	public UserRoleDto createUserRole(UserRoleDto userRoleDto) {
		UserRole userRole = this.modelMapper.map(userRoleDto, UserRole.class);
		UserRole savedUserRole = this.userRoleRepo.save(userRole);
		return this.modelMapper.map(savedUserRole, UserRoleDto.class);
	}

	@Override
	public void deleteUserRole(Integer roleId) {
		// TODO Auto-generated method stub

	}

}
