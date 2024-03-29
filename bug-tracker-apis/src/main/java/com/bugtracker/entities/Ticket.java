package com.bugtracker.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Ticket {

	@Id
	@Column(name = "ticket_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int ticketId;

	@Column(name = "title")
	private String ticketTitle;

	@Column(name = "description")
	private String ticketDescription;

	@Column(name = "resolution_summary")
	private String resolutionSummary;

	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "create_date")
	private Date createdDate;

	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date")
	private Date updateDate;

	@OneToMany(mappedBy = "ticketCommentId")
	private List<Comment> comments = new ArrayList<>();

	@ManyToOne
	@JoinColumn(name = "ticket_project_id")
	private Project ticketProjectId;

	@ManyToOne
	@JoinColumn(name = "ticket_type_id")
	private TicketType ticketType;

	@ManyToOne
	@JoinColumn(name = "ticket_status_id")
	private TicketStatus ticketStatus;

	@ManyToOne
	@JoinColumn(name = "created_by_user_id")
	private User createdByUserId;

	@ManyToOne
	@JoinColumn(name = "updated_by_user_id")
	private User updatedByUserId;

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

	public Project getProjectId() {
		return ticketProjectId;
	}

	public void setProjectId(Project ticketProjectId) {
		this.ticketProjectId = ticketProjectId;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	public Project getTicketProjectId() {
		return ticketProjectId;
	}

	public void setTicketProjectId(Project ticketProjectId) {
		this.ticketProjectId = ticketProjectId;
	}

	public User getCreatedByUserId() {
		return createdByUserId;
	}

	public void setCreatedByUserId(User createdByUserId) {
		this.createdByUserId = createdByUserId;
	}

	public User getUpdatedByUserId() {
		return updatedByUserId;
	}

	public void setUpdatedByUserId(User updatedByUserId) {
		this.updatedByUserId = updatedByUserId;
	}

	public TicketType getTicketType() {
		return ticketType;
	}

	public void setTicketType(TicketType ticketType) {
		this.ticketType = ticketType;
	}

	public TicketStatus getTicketStatus() {
		return ticketStatus;
	}

	public void setTicketStatus(TicketStatus ticketStatus) {
		this.ticketStatus = ticketStatus;
	}

}
