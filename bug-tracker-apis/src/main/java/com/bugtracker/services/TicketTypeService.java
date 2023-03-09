package com.bugtracker.services;

import java.util.List;

import com.bugtracker.payloads.TicketTypeDto;

public interface TicketTypeService {
	
	List<TicketTypeDto> getAllTicketType();
	
	TicketTypeDto createTicketType(TicketTypeDto ticketType);
	
	void deleteTicketType();
}
