package com.bugtracker.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bugtracker.entities.Project;
import com.bugtracker.entities.Ticket;
import com.bugtracker.entities.TicketStatus;
import com.bugtracker.entities.TicketType;
import com.bugtracker.entities.User;
import com.bugtracker.exceptions.ResourceNotFoundException;
import com.bugtracker.payloads.TicketDto;
import com.bugtracker.repositories.ProjectRepo;
import com.bugtracker.repositories.TicketRepo;
import com.bugtracker.repositories.TicketStatusRepo;
import com.bugtracker.repositories.TicketTypeRepo;
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
	
	@Autowired
	TicketTypeRepo ticketTypeRepo;
	
	@Autowired
	TicketStatusRepo ticketStatusRepo;
	
	@Override
	public List<TicketDto> getAllTickets() {
		List<Ticket> allTickets = this.ticketRepo.findAll();
		List<TicketDto> allTicketsDto = allTickets.stream().map((ticket) -> this.modelMapper.map(ticket, TicketDto.class)).collect(Collectors.toList());
		return allTicketsDto;
	}

	@Override
	public TicketDto getTicketById(Integer ticketId) {
		Ticket ticket = this.ticketRepo.findById(ticketId).orElseThrow(() -> new ResourceNotFoundException("Ticket not found"));
		TicketDto ticketDto = this.modelMapper.map(ticket, TicketDto.class);
		return ticketDto;
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
	public TicketDto createTicket(TicketDto ticketDto, Integer userId, Integer projectId, Integer ticketTypeId, Integer ticketStatusId) {
		List<Ticket> ticketList = new ArrayList<>();
		User user = this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
		Project project = this.projectRepo.findById(projectId).orElseThrow(() -> new ResourceNotFoundException("Project not found"));
		TicketType ticketType = this.ticketTypeRepo.findById(ticketTypeId).orElseThrow(() -> new ResourceNotFoundException("Ticket type not found"));
		TicketStatus ticketStatus = this.ticketStatusRepo.findById(ticketStatusId).orElseThrow(() -> new ResourceNotFoundException("Ticket status not found"));
		Ticket ticket = this.modelMapper.map(ticketDto, Ticket.class);
		ticket.setCreatedByUserId(user);
		ticket.setProjectId(project);
		ticket.setTicketType(ticketType);
		ticket.setTicketStatus(ticketStatus);
		ticketList = project.getTickets();
		ticketList.add(ticket);
		project.setTickets(ticketList);
		Ticket savedTicket = this.ticketRepo.save(ticket);
		return this.modelMapper.map(savedTicket, TicketDto.class);
	}

	@Override
	public TicketDto updateTicket(TicketDto ticketDto, Integer ticketId, Integer ticketTypeId, Integer ticketStatusId) {
		Ticket foundTicket = this.ticketRepo.findById(ticketId).orElseThrow(() -> new ResourceNotFoundException("Ticket not found"));
		Ticket ticket = this.modelMapper.map(ticketDto, Ticket.class);
		TicketType ticketType = this.ticketTypeRepo.findById(ticketTypeId).orElseThrow(() -> new ResourceNotFoundException("Ticket type not found"));
		TicketStatus ticketStatus = this.ticketStatusRepo.findById(ticketStatusId).orElseThrow(() -> new ResourceNotFoundException("Ticket status not found"));
		foundTicket.setTicketTitle(ticket.getTicketTitle());
		foundTicket.setTicketDescription(ticket.getTicketDescription());
		foundTicket.setResolutionSummary(ticket.getResolutionSummary());
		foundTicket.setTicketType(ticketType);
		foundTicket.setTicketStatus(ticketStatus);
		Ticket savedTicket = this.ticketRepo.save(foundTicket);
		return this.modelMapper.map(savedTicket, TicketDto.class);
	}
	
	@Override
	public void deleteTicket(Integer ticketId) {
		Ticket foundTicket = this.ticketRepo.findById(ticketId).orElseThrow(() -> new ResourceNotFoundException("Ticket not found"));
		this.ticketRepo.delete(foundTicket);
	}
}
