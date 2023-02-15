package com.bugtracker.payloads;

import java.util.List;

public class UserDto {

	private int userId;
	
	private String email;
	
	private String password;
	
	private String name;
	
	private List<ProjectDto> project;
	
	private CompanyDto company;

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
}