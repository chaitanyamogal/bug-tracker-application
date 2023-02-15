package com.bugtracker.payloads;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.bugtracker.entities.Company;
import com.bugtracker.entities.User;



public class ProjectDto {
	
	private int projectId;
	
	private String name;
	
	private String description;
	
	private Date createdDate;

	private Date updateDate;
	
	private CompanyDto company;
	
	//private List<User> user = new ArrayList<>();
	
	ProjectDto(){
		
	}

	public int getProjectId() {
		return projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public CompanyDto getCompany() {
		return company;
	}

	public void setCompany(CompanyDto company) {
		this.company = company;
	}

//	public List<User> getUser() {
//		return user;
//	}
//
//	public void setUser(List<User> user) {
//		this.user = user;
//	}
	
	
}
