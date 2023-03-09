package com.bugtracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.bugtracker.payloads.TicketStatusDto;
import com.bugtracker.services.TicketStatusService;

public class TicketStatusController {
	
	@Autowired
	TicketStatusService ticketStatusService;

	@GetMapping("/")
	public ResponseEntity<List<TicketStatusDto>> getAllTicketType(){
		List<TicketStatusDto> ticketStatusDtos = this.ticketStatusService.getAllTicketStatus();
		return new ResponseEntity<List<TicketStatusDto>>(ticketStatusDtos, HttpStatus.CREATED);
	}
	
	
	@PostMapping("/")
	public ResponseEntity<TicketStatusDto> createTicketStatus(@RequestBody TicketStatusDto ticketStatus){
		TicketStatusDto ticketStatusDto = this.ticketStatusService.createTicketStatus(ticketStatus);
		return new ResponseEntity<TicketStatusDto>(ticketStatusDto, HttpStatus.CREATED);
	}
}
