package com.bugtracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bugtracker.payloads.UserDto;
import com.bugtracker.services.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	UserService userService;

	@GetMapping("/users")
	public ResponseEntity<List<UserDto>> getAllUsers() {
		List<UserDto> users = this.userService.getAllUsers();
		return new ResponseEntity<List<UserDto>>(users, HttpStatus.OK);
	}

	@GetMapping("/users/{userId}")
	public ResponseEntity<UserDto> getUserById(@PathVariable Integer userId) {
		UserDto user = this.userService.getUserById(userId);
		return new ResponseEntity<UserDto>(user, HttpStatus.OK);
	}

	@PostMapping("/company/users")
	public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
		UserDto user = this.userService.createUser(userDto);
		return new ResponseEntity<UserDto>(user, HttpStatus.CREATED);
	}
	
	@PostMapping("/users/company/{companyId}")
	public ResponseEntity<List<UserDto>> findUsersByCompany(@PathVariable Integer companyId){
		List<UserDto> usersByCompany = this.userService.findUsersByCompany(companyId);
		return new ResponseEntity<List<UserDto>>(usersByCompany, HttpStatus.OK);
	}

	@PostMapping("/users/{userId}/company/{companyId}")
	public ResponseEntity<UserDto> assignCompanyToUser(@PathVariable Integer userId, @PathVariable Integer companyId) {
		UserDto user = this.userService.assignCompanyToUser(userId, companyId);
		return new ResponseEntity<UserDto>(user, HttpStatus.OK);
	}

	@PostMapping("/users/{userId}/project/{projectId}")
	public ResponseEntity<UserDto> assignProjectToUser(@PathVariable Integer userId, @PathVariable Integer projectId) {
		UserDto user = this.userService.assignProjectToUser(userId, projectId);
		return new ResponseEntity<UserDto>(user, HttpStatus.OK);
	}

}
