package com.bugtracker.services;

import java.util.List;

import com.bugtracker.payloads.CommentDto;


public interface CommentService {
	CommentDto createComment(CommentDto commentDto, Integer userId, Integer ticketId);

	CommentDto updateComment(CommentDto commentDto, Integer commentId);

	CommentDto getCommentById(Integer commentId);

	List<CommentDto> getAllComment();

	void deleteComment(Integer commentId);
}
