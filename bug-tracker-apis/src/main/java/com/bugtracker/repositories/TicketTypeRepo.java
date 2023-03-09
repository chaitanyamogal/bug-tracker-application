package com.bugtracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bugtracker.entities.TicketType;

public interface TicketTypeRepo extends JpaRepository<TicketType, Integer>{

}
