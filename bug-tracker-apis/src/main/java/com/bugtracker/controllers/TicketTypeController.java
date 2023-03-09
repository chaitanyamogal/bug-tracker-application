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

import com.bugtracker.payloads.TicketTypeDto;
import com.bugtracker.services.TicketTypeService;

@RestController
@RequestMapping("/api/ticket-type")
public class TicketTypeController {
	
	@Autowired
	TicketTypeService tickerTypeService;
	
	@GetMapping("/")
	public ResponseEntity<List<TicketTypeDto>> getAllTicketType(){
		List<TicketTypeDto> ticketTypeDtos = this.tickerTypeService.getAllTicketType();
		return new ResponseEntity<List<TicketTypeDto>>(ticketTypeDtos, HttpStatus.CREATED);
	}
	
	
	@PostMapping("/")
	public ResponseEntity<TicketTypeDto> createTicketType(@RequestBody TicketTypeDto ticketType){
		TicketTypeDto ticketTypeDto = this.tickerTypeService.createTicketType(ticketType);
		return new ResponseEntity<TicketTypeDto>(ticketTypeDto, HttpStatus.CREATED);
	}
	
}
