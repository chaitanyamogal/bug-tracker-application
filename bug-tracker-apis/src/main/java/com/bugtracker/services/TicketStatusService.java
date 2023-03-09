package com.bugtracker.services;

import java.util.List;

import com.bugtracker.payloads.TicketStatusDto;

public interface TicketStatusService {
	List<TicketStatusDto> getAllTicketStatus();
	
	TicketStatusDto createTicketStatus(TicketStatusDto ticketStatusDto);
	
	void deleteTicketStatus();
}
