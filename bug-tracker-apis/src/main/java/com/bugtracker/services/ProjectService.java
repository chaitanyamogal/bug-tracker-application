package com.bugtracker.services;

import java.util.List;

import com.bugtracker.entities.Project;
import com.bugtracker.payloads.ProjectDto;

public interface ProjectService {

	ProjectDto createProject(ProjectDto projectDto, Integer companyId);
	
	ProjectDto updateProjecty(ProjectDto projectDto, Integer projectId);
	
	void deleteProject(Integer projectId);
	
	List<ProjectDto> getAllProjects();
	
	ProjectDto getProjectById(Integer projetId);
	
	List<ProjectDto> getProjectsByCompany(Integer companyId);
	
	List<ProjectDto> searchProjects(String keyword);
	
}
