package com.bugtracker.payloads;

import java.util.Date;
import java.util.List;

public class TicketDto {

	private int ticketId;

	private String ticketTitle;

	private String ticketDescription;
	
	private String resolutionSummary;
	
	// private UserDto createdByUserId;
	
	private List<CommentDto> comments;
	
	private Date createdDate;

	private Date updateDate;

	public int getTicketId() {
		return ticketId;
	}

	public void setTicketId(int ticketId) {
		this.ticketId = ticketId;
	}

	public String getTicketTitle() {
		return ticketTitle;
	}

	public void setTicketTitle(String ticketTitle) {
		this.ticketTitle = ticketTitle;
	}

	public String getTicketDescription() {
		return ticketDescription;
	}

	public void setTicketDescription(String ticketDescription) {
		this.ticketDescription = ticketDescription;
	}

	public String getResolutionSummary() {
		return resolutionSummary;
	}

	public void setResolutionSummary(String resolutionSummary) {
		this.resolutionSummary = resolutionSummary;
	}
	
//	public UserDto getCreatedByUserId() {
//		return createdByUserId;
//	}
//
//	public void setCreatedByUserId(UserDto createdByUserId) {
//		this.createdByUserId = createdByUserId;
//	}

	public List<CommentDto> getComments() {
		return comments;
	}

	public void setComments(List<CommentDto> comments) {
		this.comments = comments;
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
	
}
