package com.bugtracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bugtracker.entities.TicketStatus;

public interface TicketStatusRepo extends JpaRepository<TicketStatus, Integer>{
}
