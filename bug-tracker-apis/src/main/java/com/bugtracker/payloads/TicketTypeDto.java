package com.bugtracker.payloads;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class TicketTypeDto {

	private Integer ticketTypeId;

	private String type;

	private String description;

	@JsonIgnore
	private List<TicketDto> tickets = new ArrayList<>();

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

	public List<TicketDto> getTickets() {
		return tickets;
	}

	public void setTickets(List<TicketDto> tickets) {
		this.tickets = tickets;
	}

}
