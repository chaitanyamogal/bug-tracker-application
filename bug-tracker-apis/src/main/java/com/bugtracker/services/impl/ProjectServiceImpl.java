package com.bugtracker.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bugtracker.entities.Company;
import com.bugtracker.entities.Project;
import com.bugtracker.exceptions.ResourceNotFoundException;
import com.bugtracker.payloads.CompanyDto;
import com.bugtracker.payloads.ProjectDto;
import com.bugtracker.repositories.CompanyRepo;
import com.bugtracker.repositories.ProjectRepo;
import com.bugtracker.services.ProjectService;

@Service
public class ProjectServiceImpl implements ProjectService {

	@Autowired
	private ModelMapper modalMapper;
	@Autowired
	private ProjectRepo projectRepo;
	
	
	@Autowired
	private CompanyRepo companyRepo;
	
	@Override
	public ProjectDto createProject(ProjectDto projectDto, Integer companyId) {
		Company company  = this.companyRepo.findById(companyId).orElseThrow(() -> new ResourceNotFoundException("Company", "Company id", companyId));
		
		Project project = this.modalMapper.map(projectDto, Project.class);
		project.setCompany(company);
		
		Project newProject = this.projectRepo.save(project);
		return this.modalMapper.map(newProject, ProjectDto.class);
	}

	@Override
	public ProjectDto updateProjecty(ProjectDto projectDto, Integer projectId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteProject(Integer projectId) {
		// TODO Auto-generated method stub

	}

	@Override
	public List<ProjectDto> getAllProjects() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ProjectDto getProjectById(Integer projetId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ProjectDto> getProjectsByCompany(Integer companyId) {
		Company company = this.companyRepo.findById(companyId).orElseThrow(() -> new ResourceNotFoundException("Company", "company id", companyId));
		List<Project> projects = this.projectRepo.findByCompany(company);
		
		List<ProjectDto> projectDtos = projects.stream().map((project) -> this.modalMapper.map(projects, ProjectDto.class)).collect(Collectors.toList());
		return projectDtos;
	}

	@Override
	public List<ProjectDto> searchProjects(String keyword) {
		// TODO Auto-generated method stub
		return null;
	}

}
