package com.bugtracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bugtracker.payloads.TicketDto;
import com.bugtracker.services.TicketService;


@RestController
@RequestMapping("/api")
public class TicketController {
	
	@Autowired
	TicketService ticketService;
	
	@GetMapping("/ticket")
	public ResponseEntity<List<TicketDto>> getAllTickets(){
		List<TicketDto> tickets = this.ticketService.getAllTickets();
		return new ResponseEntity<List<TicketDto>>(tickets, HttpStatus.OK);
	}
	
	@GetMapping("/ticket/{ticketId}")
	public ResponseEntity<TicketDto> getTicketById(@PathVariable Integer ticketId){
			TicketDto ticket = this.ticketService.getTicketById( ticketId);
			return new ResponseEntity<TicketDto>(ticket, HttpStatus.CREATED);
	}
	
	@PostMapping("/user/{userId}/project/{projectId}/ticket")
	public ResponseEntity<TicketDto> createTicket(@RequestBody TicketDto ticketDto, @PathVariable Integer userId, @PathVariable Integer projectId){
			TicketDto ticket = this.ticketService.createTicket(ticketDto, userId, projectId);
			return new ResponseEntity<TicketDto>(ticket, HttpStatus.CREATED);
	}
	
	@PutMapping("/ticket/{ticketId}")
	public ResponseEntity<TicketDto> updateTicket(@RequestBody TicketDto ticketDto, @PathVariable Integer ticketId){
			TicketDto ticket = this.ticketService.updateTicket(ticketDto, ticketId);
			return new ResponseEntity<TicketDto>(ticket, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/ticket/{ticketId}")
	public ResponseEntity<String> deleteTicket(@PathVariable Integer ticketId){
		 this.ticketService.deleteTicket(ticketId);
		 return new ResponseEntity<String>("Ticket Deleted Successfully",HttpStatus.OK);
		
	}
	
}
