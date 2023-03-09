package com.bugtracker.payloads;

import java.util.ArrayList;
import java.util.List;

import com.bugtracker.entities.Ticket;

public class TicketStatusDto {
	
	private Integer ticketStatusId;
	
	private String status;
	
	private String description;
	
	private List<Ticket> tickets = new ArrayList<>();

	public Integer getTicketStatusId() {
		return ticketStatusId;
	}

	public void setTicketStatusId(Integer ticketStatusId) {
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
