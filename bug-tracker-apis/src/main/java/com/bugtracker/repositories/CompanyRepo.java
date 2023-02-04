package com.bugtracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bugtracker.entities.Company;

public interface CompanyRepo extends JpaRepository<Company, Integer>{

}
