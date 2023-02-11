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
	public ProjectDto updateProject(ProjectDto projectDto, Integer projectId) {
		Project foundProject = this.projectRepo.findById(projectId).orElseThrow(() -> new ResourceNotFoundException("Project", "Project id", projectId));
		Project project = this.modalMapper.map(projectDto, Project.class);
		
		foundProject.setName(project.getName());
		foundProject.setDescription(project.getDescription());
		Project updatedProject = this.projectRepo.save(foundProject);
		return this.modalMapper.map(updatedProject, ProjectDto.class);
	}

	@Override
	public void deleteProject(Integer projectId) {
		this.projectRepo.deleteById(projectId);
	}

	@Override
	public List<ProjectDto> getAllProjects() {
		List<Project> allProjects = this.projectRepo.findAll();
		List<ProjectDto> allProjectsDto = allProjects.stream().map((project) -> this.modalMapper.map(project, ProjectDto.class)).collect(Collectors.toList());
		return allProjectsDto;
	}

	@Override
	public ProjectDto getProjectById(Integer projectId) {
		Project project = this.projectRepo.findById(projectId).orElseThrow(() -> new ResourceNotFoundException("Project", "Project id", projectId));;
		ProjectDto projectDto = this.modalMapper.map(project, ProjectDto.class);
		return projectDto;
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
