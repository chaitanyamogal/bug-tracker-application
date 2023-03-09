package com.bugtracker.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class User {

	@Id
	@Column(name = "user_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;
	
	@Column(name = "email")
	private String userEmail;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "name")
	private String name;
	
	@ManyToOne
	@JoinColumn(name = "role_id")
	private UserRole userRole;
	
	@ManyToOne
	@JoinColumn(name = "company_id")
	private Company company;
	
	@ManyToMany
	@JoinTable(name = "user_project", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "project_id"))
	private List<Project> project = new ArrayList<>();;

	@OneToMany(mappedBy = "createdByUserId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Ticket> tickets = new ArrayList<>();

	@OneToMany(mappedBy = "updatedByUserId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Ticket> updatedTickets = new ArrayList<>();

	@OneToMany(mappedBy = "createdByUserId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Ticket> comments = new ArrayList<>();

	@OneToMany(mappedBy = "updatedByUserId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Ticket> updatedComments = new ArrayList<>();

	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "create_date")
	private Date createdDate;

	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date")
	private Date updateDate;

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
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

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public List<Project> getProject() {
		return project;
	}

	public void setProject(List<Project> project) {
		this.project = project;
	}

	public List<Ticket> getTickets() {
		return tickets;
	}
	
	@JsonBackReference
	public void setTickets(List<Ticket> tickets) {
		this.tickets = tickets;
	}

	public List<Ticket> getUpdatedTickets() {
		return updatedTickets;
	}

	public void setUpdatedTickets(List<Ticket> updatedTickets) {
		this.updatedTickets = updatedTickets;
	}

	public List<Ticket> getComments() {
		return comments;
	}

	public void setComments(List<Ticket> comments) {
		this.comments = comments;
	}

	public List<Ticket> getUpdatedComments() {
		return updatedComments;
	}

	public void setUpdatedComments(List<Ticket> updatedComments) {
		this.updatedComments = updatedComments;
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

}
