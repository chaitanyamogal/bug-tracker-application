package com.bugtracker.services.impl;

import java.util.List;
import java.util.stream.Collectors;

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
	CompanyRepo companyRepo;

	@Override
	public CompanyDto createCompany(CompanyDto companyDto) {
		Company company = this.dtoToCompany(companyDto);
		Company savedCompany = companyRepo.save(company);
		return this.companyToDto(savedCompany);
	}

	@Override
	public CompanyDto updateCompany(CompanyDto companyDto, Integer companyId) {
		// Company company = this.dtoToCompany(companyDto);
		Company company = this.companyRepo.findById(companyId)
				.orElseThrow(() -> new ResourceNotFoundException("Company", " id ", companyId));

		company.setCompanyName(companyDto.getCompanyName());
		company.setCompanyDescription(companyDto.getCompanyDescription());

		Company updatedCompany = this.companyRepo.save(company);
		CompanyDto updatedCompanyDto = this.companyToDto(updatedCompany);
		return updatedCompanyDto;
	}

	@Override
	public CompanyDto getCompanyById(Integer companyId) {
		Company company = this.companyRepo.findById(companyId)
				.orElseThrow(() -> new ResourceNotFoundException("Company", " id ", companyId));

		return this.companyToDto(company);
	}

	@Override
	public List<CompanyDto> getAllCompanies() {
		List<Company> companies = this.companyRepo.findAll();
		List<CompanyDto> companiesDto = companies.stream().map(company -> this.companyToDto(company))
				.collect(Collectors.toList());
		return companiesDto;
	}

	@Override
	public void deleteCompany(Integer companyId) {
		Company company = this.companyRepo.findById(companyId)
				.orElseThrow(() -> new ResourceNotFoundException("Company", " id ", companyId));
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
