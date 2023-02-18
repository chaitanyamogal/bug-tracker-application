package com.bugtracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bugtracker.entities.Ticket;

public interface TicketRepo extends JpaRepository<Ticket, Integer> {
		
}
