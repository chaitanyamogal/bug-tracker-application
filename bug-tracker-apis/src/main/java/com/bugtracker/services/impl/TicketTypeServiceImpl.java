package com.bugtracker.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bugtracker.entities.TicketType;
import com.bugtracker.payloads.TicketTypeDto;
import com.bugtracker.repositories.TicketTypeRepo;
import com.bugtracker.services.TicketTypeService;

@Service
public class TicketTypeServiceImpl implements TicketTypeService {
	
	@Autowired
	ModelMapper modelMapper;
	
	@Autowired
	TicketTypeRepo ticketTypeRepo;
	

	@Override
	public List<TicketTypeDto> getAllTicketType() {
		List<TicketType> ticketTypes = this.ticketTypeRepo.findAll();
		List<TicketTypeDto> ticketTypesDto = ticketTypes.stream().map((ticketType) -> this.modelMapper.map(ticketTypes, TicketTypeDto.class))
				.collect(Collectors.toList());
		return ticketTypesDto;
	}

	@Override
	public TicketTypeDto createTicketType(TicketTypeDto ticketTypeDto) {
		TicketType ticketType = this.modelMapper.map(ticketTypeDto, TicketType.class);
		TicketType savedTicketType = this.ticketTypeRepo.save(ticketType);
		return this.modelMapper.map(savedTicketType, TicketTypeDto.class);
	}

	@Override
	public void deleteTicketType() {
		// TODO Auto-generated method stub

	}

}
