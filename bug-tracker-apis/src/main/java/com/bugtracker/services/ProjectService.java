package com.bugtracker.services;

import java.util.List;

import com.bugtracker.payloads.ProjectDto;

public interface ProjectService {

	ProjectDto createProject(ProjectDto projectDto, Integer companyId);
	
	ProjectDto updateProject(ProjectDto projectDto, Integer projectId);
	
	void deleteProject(Integer projectId);
	
	List<ProjectDto> getAllProjects();
	
	ProjectDto getProjectById(Integer projectId);
	
	List<ProjectDto> getProjectsByCompany(Integer companyId);
	
	List<ProjectDto> searchProjects(String keyword);
	
	List<ProjectDto> findProjectByUser(Integer userId);
}
