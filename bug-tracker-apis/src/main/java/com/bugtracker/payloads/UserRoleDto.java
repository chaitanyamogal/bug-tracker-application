package com.bugtracker.payloads;

public class UserRoleDto {

	private Integer roleId;

	private String role;

	// private List<User> user = new ArrayList<>();

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

//	public List<User> getUser() {
//		return user;
//	}
//
//	public void setUser(List<User> user) {
//		this.user = user;
//	}
}
