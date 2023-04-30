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

import com.bugtracker.payloads.CompanyDto;
import com.bugtracker.services.CompanyService;

@RestController
@RequestMapping("/api")
public class CompanyController {

	@Autowired
	CompanyService companyService;

	@GetMapping("/companies")
	public ResponseEntity<List<CompanyDto>> getAllCompanies() {
		List<CompanyDto> companyDto = this.companyService.getAllCompanies();
		return new ResponseEntity<List<CompanyDto>>(companyDto, HttpStatus.CREATED);
	}

	@GetMapping("/companies/{companyId}")
	public ResponseEntity<CompanyDto> getCompanyById(@PathVariable Integer companyId) {
		return ResponseEntity.ok(this.companyService.getCompanyById(companyId));
	}

	@PostMapping("/companies")
	public ResponseEntity<CompanyDto> createCompany(@RequestBody CompanyDto companyDto) {
		CompanyDto createCompanyDto = this.companyService.createCompany(companyDto);
		return new ResponseEntity<>(createCompanyDto, HttpStatus.CREATED);
	}

	@PutMapping("/companies/{companyId}")
	public ResponseEntity<CompanyDto> updateCompany(@RequestBody CompanyDto companyDto,
			@PathVariable Integer companyId) {
		CompanyDto updateCompanyDto = this.companyService.updateCompany(companyDto, companyId);
		return ResponseEntity.ok(updateCompanyDto);
	}

	@DeleteMapping("/companies/{companyId}")
	public ResponseEntity<String> deleteCompany(@PathVariable Integer companyId) {
		this.companyService.deleteCompany(companyId);
		return new ResponseEntity<String>("Company Deleted Successfully", HttpStatus.OK);
	}

}
