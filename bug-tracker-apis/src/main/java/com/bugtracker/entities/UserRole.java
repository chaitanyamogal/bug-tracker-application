package com.bugtracker.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class UserRole {
	@Id
	@Column(name = "role_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer roleId;

	@Column(name = "role")
	private String role;

	
	@OneToMany(mappedBy = "userRole", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<User> user = new ArrayList<>();

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public List<User> getUser() {
		return user;
	}

	public void setUser(List<User> user) {
		this.user = user;
	}

}
