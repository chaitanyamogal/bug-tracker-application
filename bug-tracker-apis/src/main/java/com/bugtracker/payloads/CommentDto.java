package com.bugtracker.payloads;

import java.util.Date;


public class CommentDto {
	
	private int commentId;

	private String comment;

	private Date createdDate;

	private Date updateDate;

	//private UserDto createdByUserId;
	
	public int getCommentId() {
		return commentId;
	}

	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

//	public UserDto getCreatedByUserId() {
//		return createdByUserId;
//	}
//
//	public void setCreatedByUserId(UserDto createdByUserId) {
//		this.createdByUserId = createdByUserId;
//	}
//	
	
}