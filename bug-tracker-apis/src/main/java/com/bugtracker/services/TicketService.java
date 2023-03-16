package com.bugtracker.services;

import java.util.List;
import com.bugtracker.payloads.TicketDto;


public interface TicketService {
	
	List<TicketDto> getAllTickets();
	
	TicketDto getTicketById(Integer ticketId);
	
	List<TicketDto> getTicketsByUser(Integer userId);
	
	List<TicketDto> getTicketsByProject(Integer projectId);
	
	TicketDto createTicket(TicketDto ticketDto, Integer userId, Integer projectId, Integer ticketTypeId, Integer ticketStatusId);
	
	TicketDto updateTicket(TicketDto ticketDto, Integer ticketId, Integer ticketTypeId, Integer ticketStatusId);
	
	void deleteTicket(Integer ticketId);
	
}
