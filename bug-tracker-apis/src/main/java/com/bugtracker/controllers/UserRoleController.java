package com.bugtracker.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bugtracker.payloads.UserRoleDto;
import com.bugtracker.services.UserRoleService;

@RestController
@RequestMapping("/api/user-role")
public class UserRoleController {
	
	@Autowired
	UserRoleService userRoleService;
	
	@PostMapping("/")
	public ResponseEntity<UserRoleDto> createUserRole(@RequestBody UserRoleDto userRole){
		UserRoleDto userRoleDto = this.userRoleService.createUserRole(userRole);
		return new ResponseEntity<UserRoleDto>(userRoleDto, HttpStatus.CREATED);
	}
}
