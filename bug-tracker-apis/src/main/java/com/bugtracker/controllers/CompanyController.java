package com.bugtracker.controllers;

import java.util.List;
import java.util.Map;

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
@RequestMapping("/api/companies")
public class CompanyController {

	@Autowired
	CompanyService companyService;

	@PostMapping("/")
	public ResponseEntity<CompanyDto> createCompany(@RequestBody CompanyDto companyDto) {
		CompanyDto createCompanyDto = this.companyService.createCompany(companyDto);
		return new ResponseEntity<>(createCompanyDto, HttpStatus.CREATED);
	}

	@PutMapping("/{userId}")
	public ResponseEntity<CompanyDto> updateCompany(@RequestBody CompanyDto companyDto, @PathVariable Integer userId) {
		CompanyDto updateCompanyDto = this.companyService.updateCompany(companyDto, userId);
		return ResponseEntity.ok(updateCompanyDto);
	}

	@DeleteMapping("/{userId}")
	public ResponseEntity<?> deleteCompany(@PathVariable Integer userId) {
		this.deleteCompany(userId);
		return new ResponseEntity(Map.of("message", "User Deleted Successfully"), HttpStatus.OK);
	}

	@GetMapping("/")
	public ResponseEntity<List<CompanyDto>> getAllCompanies() {
		return ResponseEntity.ok(this.companyService.getAllCompanies());
	}

	@GetMapping("/{userId}")
	public ResponseEntity<CompanyDto> getCompanyById(@PathVariable Integer userId) {
		return ResponseEntity.ok(this.companyService.getCompanyById(userId));
	}
}
