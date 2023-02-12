package com.bugtracker.services;

import java.util.List;

import com.bugtracker.payloads.CompanyDto;

public interface CompanyService {

	CompanyDto createCompany(CompanyDto company);

	CompanyDto updateCompany(CompanyDto user, Integer companyId);

	CompanyDto getCompanyById(Integer companyId);

	List<CompanyDto> getAllCompanies();

	void deleteCompany(Integer companyId);
}
