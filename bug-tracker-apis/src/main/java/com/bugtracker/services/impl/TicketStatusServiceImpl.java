package com.bugtracker.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bugtracker.entities.TicketStatus;
import com.bugtracker.entities.TicketType;
import com.bugtracker.payloads.TicketStatusDto;
import com.bugtracker.payloads.TicketTypeDto;
import com.bugtracker.repositories.TicketStatusRepo;
import com.bugtracker.services.TicketStatusService;

@Service
public class TicketStatusServiceImpl implements TicketStatusService {

	
	@Autowired
	ModelMapper modelMapper;
	
	@Autowired
	TicketStatusRepo ticketStatusRepo;
	
	@Override
	public List<TicketStatusDto> getAllTicketStatus() {
		List<TicketStatus> ticketStatuss = this.ticketStatusRepo.findAll();
		List<TicketStatusDto> ticketTypesDto = ticketStatuss.stream().map((ticketStatus) -> this.modelMapper.map(ticketStatus, TicketStatusDto.class))
				.collect(Collectors.toList());
		return ticketTypesDto;
	}

	@Override
	public TicketStatusDto createTicketStatus(TicketStatusDto ticketStatusDto) {
		TicketStatus ticketStatus = this.modelMapper.map(ticketStatusDto, TicketStatus.class);
		TicketStatus savedTicketStatus = this.ticketStatusRepo.save(ticketStatus);
		return this.modelMapper.map(savedTicketStatus, TicketStatusDto.class);
	}

	@Override
	public void deleteTicketStatus() {
		// TODO Auto-generated method stub

	}

}
