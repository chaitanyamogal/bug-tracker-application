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

import com.bugtracker.entities.Project;
import com.bugtracker.payloads.ProjectDto;
import com.bugtracker.services.ProjectService;

@RestController
@RequestMapping("/api")
public class ProjectController {
	
	@Autowired
	ProjectService projectService;
	
	@GetMapping("/company/projects")
	public ResponseEntity<List<ProjectDto>> getAllProjects(){
		List<ProjectDto> allProjects = this.projectService.getAllProjects();
		return new ResponseEntity<List<ProjectDto>>(allProjects, HttpStatus.OK);
	}
	
	@GetMapping("/company/projects/{projectId}")
	public ResponseEntity<ProjectDto> getProjectById(@PathVariable Integer projectId){
		ProjectDto project = this.projectService.getProjectById(projectId);
		return new ResponseEntity<ProjectDto>(project, HttpStatus.OK);
	}
	
	@PostMapping("/company/{companyId}/projects")
	public ResponseEntity<ProjectDto> createProject(@RequestBody ProjectDto projectDto, @PathVariable Integer companyId){
				ProjectDto createdProject = this.projectService.createProject(projectDto, companyId);
				return new ResponseEntity<ProjectDto>(createdProject, HttpStatus.CREATED);
	}

	@PutMapping("/company/projects/{projectId}")
	public ResponseEntity<ProjectDto> updateProject(@RequestBody ProjectDto projectDto, @PathVariable Integer projectId){
		ProjectDto updatedProject = this.projectService.updateProject(projectDto, projectId);
		return new ResponseEntity<ProjectDto>(updatedProject, HttpStatus.OK);
	}
	
	@DeleteMapping("/company/projects/{projectId}")
	public ResponseEntity<String> deleteProject(@PathVariable Integer projectId){
		 this.projectService.deleteProject(projectId);
		 return new ResponseEntity<String>("Project Deleted Successfully",HttpStatus.OK);
		
	}
}
