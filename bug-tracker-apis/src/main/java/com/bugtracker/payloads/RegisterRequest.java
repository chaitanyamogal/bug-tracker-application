package com.bugtracker.payloads;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

	private String email;

	private String password;

	private String name;

	private UserRoleDto userRole;

	private CompanyDto company;

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public UserRoleDto getUserRole() {
		return userRole;
	}

	public void setUserRole(UserRoleDto userRole) {
		this.userRole = userRole;
	}

	public CompanyDto getCompany() {
		return company;
	}

	public void setCompany(CompanyDto company) {
		this.company = company;
	}

	public List<ProjectDto> getProject() {
		return project;
	}

	public void setProject(List<ProjectDto> project) {
		this.project = project;
	}

}
