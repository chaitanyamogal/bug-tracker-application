package com.bugtracker.entities;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

public class Ticket {

	@Id
	@Column(name = "ticket_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int ticketId;

	@Column(name = "title")
	private String ticketTitle;

	@Column(name = "description")
	private String ticketDescription;
	
	@Column(name = "resolution_summary")
	private String resolutionSummary;

	@Column(name = "email")
	private int projectId;

	@Column(name = "email")
	private int createdByUserId;

	@Column(name = "email")
	private int updatedByUserId;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "create_date")
	private Date createdDate;

	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date")
	private Date updateDate;

}
