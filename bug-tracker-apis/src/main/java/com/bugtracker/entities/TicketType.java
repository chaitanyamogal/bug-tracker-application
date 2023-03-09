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
public class TicketType {
	@Id
	@Column(name = "ticket_type_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer ticketTypeId;
	
	@Column(name = "type")
	private String type;
	
	@Column(name = "description")
	private String description;
	
	@OneToMany(mappedBy = "ticketType")
	private List<Ticket> tickets = new ArrayList<>();

	public Integer getTicketTypeId() {
		return ticketTypeId;
	}

	public void setTicketTypeId(Integer ticketTypeId) {
		this.ticketTypeId = ticketTypeId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
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
