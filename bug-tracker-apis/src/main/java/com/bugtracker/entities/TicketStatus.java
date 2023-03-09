package com.bugtracker.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class TicketStatus {
	@Id
	@Column(name = "ticket_status_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer ticketStatusId;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "description")
	private String description;
	
	@OneToMany(mappedBy = "ticketStatus")
	private List<Ticket> tickets = new ArrayList<>();

	public Integer getTicketTypeId() {
		return ticketStatusId;
	}

	public void setTicketTypeId(Integer ticketTypeId) {
		this.ticketStatusId = ticketStatusId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Ticket> getTickets() {
		return tickets;
	}

	public void setTickets(List<Ticket> tickets) {
		this.tickets = tickets;
	}
}
