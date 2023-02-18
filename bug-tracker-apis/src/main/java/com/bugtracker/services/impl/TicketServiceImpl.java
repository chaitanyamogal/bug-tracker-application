package com.bugtracker.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bugtracker.entities.Project;
import com.bugtracker.entities.Ticket;
import com.bugtracker.entities.User;
import com.bugtracker.exceptions.ResourceNotFoundException;
import com.bugtracker.payloads.ProjectDto;
import com.bugtracker.payloads.TicketDto;
import com.bugtracker.repositories.ProjectRepo;
import com.bugtracker.repositories.TicketRepo;
import com.bugtracker.repositories.UserRepo;
import com.bugtracker.services.TicketService;

@Service
public class TicketServiceImpl implements TicketService {
	
	@Autowired
	ModelMapper modelMapper;
	
	@Autowired
	TicketRepo ticketRepo;
	
	@Autowired
	UserRepo userRepo;
	
	@Autowired
	ProjectRepo projectRepo;
	
	@Override
	public List<TicketDto> getAllTickets() {
		List<Ticket> allTickets = this.ticketRepo.findAll();
		List<TicketDto> allTicketsDto = allTickets.stream().map((ticket) -> this.modelMapper.map(ticket, TicketDto.class)).collect(Collectors.toList());
		return allTicketsDto;
	}

	@Override
	public TicketDto getTicketById(Integer ticketId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<TicketDto> getTicketsByUser(Integer userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<TicketDto> getTicketsByProject(Integer projectId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public TicketDto createTicket(TicketDto ticketDto, Integer userId, Integer projectId) {
		User user = this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "User id", userId));
		Project project = this.projectRepo.findById(projectId).orElseThrow(() -> new ResourceNotFoundException("Project", "Project id", projectId));
		Ticket ticket = this.modelMapper.map(ticketDto, Ticket.class);
		ticket.setCreatedByUserId(user);
		ticket.setProjectId(project);
		Ticket savedTicket = this.ticketRepo.save(ticket);
		return this.modelMapper.map(savedTicket, TicketDto.class);
	}

	@Override
	public TicketDto updateTicket(TicketDto ticket) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteTicket(Integer ticketId) {
		// TODO Auto-generated method stub

	}

}
