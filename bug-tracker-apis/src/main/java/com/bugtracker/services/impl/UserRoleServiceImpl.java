package com.bugtracker.services.impl;

import java.util.List;

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
	public UserRoleDto createUserRole(UserRoleDto userRoleDto) {
		UserRole userRole = this.modelMapper.map(userRoleDto, UserRole.class);
		UserRole savedUserRole = this.userRoleRepo.save(userRole);
		return this.modelMapper.map(savedUserRole, UserRoleDto.class);
	}

	@Override
	public List<UserRoleDto> getAllRoles() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteUserRole(Integer roleId) {
		// TODO Auto-generated method stub
		
	}
	
	
}
