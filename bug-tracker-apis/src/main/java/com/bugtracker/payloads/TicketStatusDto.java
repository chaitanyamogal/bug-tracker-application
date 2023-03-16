package com.bugtracker.payloads;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class TicketStatusDto {

	private Integer ticketStatusId;

	private String status;

	private String description;

	@JsonIgnore
	private List<TicketDto> tickets = new ArrayList<>();

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

	public List<TicketDto> getTickets() {
		return tickets;
	}

	public void setTickets(List<TicketDto> tickets) {
		this.tickets = tickets;
	}

}
