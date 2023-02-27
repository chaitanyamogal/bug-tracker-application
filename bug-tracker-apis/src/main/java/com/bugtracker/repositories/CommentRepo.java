package com.bugtracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bugtracker.entities.Comment;

public interface CommentRepo extends JpaRepository<Comment, Integer> {

}
