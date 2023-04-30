package com.bugtracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bugtracker.payloads.TicketStatusDto;
import com.bugtracker.services.TicketStatusService;

@RestController
@RequestMapping("/api")
public class TicketStatusController {

	@Autowired
	TicketStatusService ticketStatusService;

	@GetMapping("/ticket-status")
	public ResponseEntity<List<TicketStatusDto>> getAllTicketType() {
		List<TicketStatusDto> ticketStatusDtos = this.ticketStatusService.getAllTicketStatus();
		return new ResponseEntity<List<TicketStatusDto>>(ticketStatusDtos, HttpStatus.CREATED);
	}

	@PostMapping("/ticket-status")
	public ResponseEntity<TicketStatusDto> createTicketStatus(@RequestBody TicketStatusDto ticketStatus) {
		TicketStatusDto ticketStatusDto = this.ticketStatusService.createTicketStatus(ticketStatus);
		return new ResponseEntity<TicketStatusDto>(ticketStatusDto, HttpStatus.CREATED);
	}
}
