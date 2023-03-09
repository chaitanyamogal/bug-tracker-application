package com.bugtracker.payloads;

import java.util.ArrayList;
import java.util.List;

import com.bugtracker.entities.Ticket;

import jakarta.persistence.Entity;

public class TicketTypeDto {

	private Integer ticketTypeId;
	
	private String type;
	
	private String description;
	
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
