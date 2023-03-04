package com.bugtracker.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bugtracker.entities.Comment;
import com.bugtracker.entities.Ticket;
import com.bugtracker.entities.User;
import com.bugtracker.exceptions.ResourceNotFoundException;
import com.bugtracker.payloads.CommentDto;
import com.bugtracker.repositories.CommentRepo;
import com.bugtracker.repositories.TicketRepo;
import com.bugtracker.repositories.UserRepo;
import com.bugtracker.services.CommentService;

@Service
public class CommentServiceImpl implements CommentService {
	
	@Autowired
	ModelMapper  modelMapper;
	
	@Autowired
	CommentRepo commentRepo;
	
	@Autowired
	TicketRepo ticketRepo;
	
	@Autowired
	UserRepo userRepo;

	@Override
	public CommentDto createComment(CommentDto commentDto, Integer userId, Integer ticketId) {
		List<Comment> commentList = new ArrayList<>();
		Comment comment = this.modelMapper.map(commentDto, Comment.class);
		Ticket ticket = this.ticketRepo.findById(ticketId).orElseThrow(() -> new ResourceNotFoundException("Ticket", "Ticket id", ticketId));
		User user = this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "User id", userId));
		comment.setCreatedByUserId(user);
		comment.setTicketCommentId(ticket);
		commentList = ticket.getComments();
		commentList.add(comment);
		ticket.setComments(commentList);
		Comment savedComment = this.commentRepo.save(comment);
		return this.modelMapper.map(savedComment, CommentDto.class);
	}

	@Override
	public CommentDto updateComment(CommentDto commentDto, Integer commentId) {
		Comment foundComment = this.commentRepo.findById(commentId).orElseThrow(() -> new ResourceNotFoundException("Comment", "Comment id", commentId));
		Comment comment = this.modelMapper.map(commentDto, Comment.class);
		foundComment.setComment(comment.getComment());
		Comment savedComment = this.commentRepo.save(foundComment);
		return this.modelMapper.map(savedComment, CommentDto.class);
	}

	@Override
	public CommentDto getCommentById(Integer commentId) {
		Comment comment = this.commentRepo.findById(commentId).orElseThrow(() -> new ResourceNotFoundException("Comment", "Comment id", commentId));
		CommentDto commentDto = this.modelMapper.map(comment, CommentDto.class);
		return commentDto;
	}

	@Override
	public List<CommentDto> getAllComment() {
		List<Comment> comments = this.commentRepo.findAll();
		List<CommentDto> commentsDto = comments.stream().map((comment) -> this.modelMapper.map(comment, CommentDto.class)).collect(Collectors.toList());
		return commentsDto;
	}

	@Override
	public void deleteComment(Integer commentId) {
		Comment comment = this.commentRepo.findById(commentId).orElseThrow(() -> new ResourceNotFoundException("Comment", "Comment id", commentId));
		this.commentRepo.delete(comment);
	}

}
