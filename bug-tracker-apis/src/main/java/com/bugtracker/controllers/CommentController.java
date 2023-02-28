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

import com.bugtracker.payloads.CommentDto;
import com.bugtracker.services.CommentService;

@RestController
@RequestMapping("/api")
public class CommentController {
	
	@Autowired
	CommentService commentService;
	
	@GetMapping("/comments")
	public ResponseEntity<List<CommentDto>> getAllComments(){
		List<CommentDto> comments = this.commentService.getAllComment();
		return new ResponseEntity<List<CommentDto>>(comments, HttpStatus.CREATED);
	}
	
	@GetMapping("/comment/{commentId}")
	public ResponseEntity<CommentDto> getCommentById(@PathVariable Integer commentId){
		CommentDto comment = this.commentService.getCommentById(commentId);
		return new ResponseEntity<CommentDto>(comment, HttpStatus.CREATED);
	}
	
	@PostMapping("user/{userId}/ticket/{ticketId}/comments")
	public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto,@PathVariable Integer userId, @PathVariable Integer ticketId){
		CommentDto comment = this.commentService.createComment(commentDto, userId, ticketId );
		return new ResponseEntity<CommentDto>(comment, HttpStatus.CREATED);
	}
	
	@PutMapping("/comment/{commentId}")
	public ResponseEntity<CommentDto> updateComment(@RequestBody CommentDto commentDto, @PathVariable Integer commentId){
		CommentDto comment = this.commentService.updateComment(commentDto, commentId );
		return new ResponseEntity<CommentDto>(comment, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/comment/{commentId}")
	public ResponseEntity<String> deleteComment(@PathVariable Integer commentId){
		this.commentService.deleteComment(commentId);
		return new ResponseEntity<String>("Comment Deleted Successfully",HttpStatus.OK);
	}
}
