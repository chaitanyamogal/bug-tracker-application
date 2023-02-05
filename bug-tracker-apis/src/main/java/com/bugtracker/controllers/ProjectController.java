package com.bugtracker.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bugtracker.entities.Project;
import com.bugtracker.payloads.ProjectDto;
import com.bugtracker.services.ProjectService;

@RestController
@RequestMapping("/api")
public class ProjectController {
	
	@Autowired
	ProjectService projectService;
	
	@PostMapping("/company/{companyId}/projects")
	public ResponseEntity<ProjectDto> createProject(@RequestBody ProjectDto projectDto, @PathVariable Integer companyId){
				ProjectDto createdProject = this.projectService.createProject(projectDto, companyId);
				return new ResponseEntity<ProjectDto>(createdProject, HttpStatus.CREATED);
	}

}
