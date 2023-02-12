package com.bugtracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bugtracker.entities.User;

public interface UserRepo extends JpaRepository<User, Integer>{

}
