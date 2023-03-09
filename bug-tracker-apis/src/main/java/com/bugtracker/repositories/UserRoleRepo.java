package com.bugtracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bugtracker.entities.UserRole;

public interface UserRoleRepo extends JpaRepository<UserRole, Integer> {

}
