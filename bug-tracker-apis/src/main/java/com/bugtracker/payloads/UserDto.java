package com.bugtracker.payloads;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDto {

	private int userId;
	
	private String email;

	private String password;

	private String name;

	private CompanyDto company;
	
	private UserRoleDto userRole;

	@JsonIgnore
	private List<ProjectDto> project;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<ProjectDto> getProject() {
		return project;
	}

	public void setProject(List<ProjectDto> project) {
		this.project = project;
	}

	public CompanyDto getCompany() {
		return company;
	}

	public void setCompany(CompanyDto company) {
		this.company = company;
	}

	public UserRoleDto getUserRole() {
		return userRole;
	}

	public void setUserRole(UserRoleDto userRole) {
		this.userRole = userRole;
	}

	
}
