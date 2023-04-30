package com.bugtracker.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bugtracker.entities.Company;
import com.bugtracker.payloads.CompanyDto;
import com.bugtracker.repositories.CompanyRepo;
import com.bugtracker.services.CompanyService;
import com.bugtracker.exceptions.*;

@Service
public class CompanyServiceImpl implements CompanyService {

	@Autowired
	ModelMapper modelMapper;

	@Autowired
	CompanyRepo companyRepo;

	@Override
	public List<CompanyDto> getAllCompanies() {
		List<Company> companies = this.companyRepo.findAll();
		List<CompanyDto> companiesDto = companies.stream()
				.map((company) -> this.modelMapper.map(company, CompanyDto.class)).collect(Collectors.toList());
		return companiesDto;
	}

	@Override
	public CompanyDto getCompanyById(Integer companyId) {
		Company company = this.companyRepo.findById(companyId)
				.orElseThrow(() -> new ResourceNotFoundException("Company not found"));

		return this.modelMapper.map(company, CompanyDto.class);
	}

	@Override
	public CompanyDto createCompany(CompanyDto companyDto) {
		Company company = this.dtoToCompany(companyDto);
		Company savedCompany = companyRepo.save(company);
		return this.modelMapper.map(savedCompany, CompanyDto.class);
	}

	@Override
	public CompanyDto updateCompany(CompanyDto companyDto, Integer companyId) {
		// Company company = this.dtoToCompany(companyDto);
		Company company = this.companyRepo.findById(companyId)
				.orElseThrow(() -> new ResourceNotFoundException("Company not found"));

		company.setCompanyName(companyDto.getCompanyName());
		company.setCompanyDescription(companyDto.getCompanyDescription());

		Company updatedCompany = this.companyRepo.save(company);
		CompanyDto updatedCompanyDto = this.modelMapper.map(updatedCompany, CompanyDto.class);
		return updatedCompanyDto;
	}

	@Override
	public void deleteCompany(Integer companyId) {
		Company company = this.companyRepo.findById(companyId)
				.orElseThrow(() -> new ResourceNotFoundException("Company not found"));
		this.companyRepo.delete(company);
	}

	public Company dtoToCompany(CompanyDto companyDto) {
		Company company = new Company();
		company.setCompanyId(companyDto.getCompanyId());
		company.setCompanyName(companyDto.getCompanyName());
		company.setCompanyDescription(companyDto.getCompanyDescription());
		return company;
	}

	public CompanyDto companyToDto(Company company) {
		CompanyDto companyDto = new CompanyDto();
		companyDto.setCompanyId(company.getCompanyId());
		companyDto.setCompanyName(company.getCompanyName());
		companyDto.setCompanyDescription(company.getCompanyDescription());
		return companyDto;
	}

}
