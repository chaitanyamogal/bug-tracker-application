package com.bugtracker.controllers;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bugtracker.payloads.AuthenticationRequest;
import com.bugtracker.payloads.AuthenticationResponse;
import com.bugtracker.payloads.RegisterRequest;
import com.bugtracker.services.impl.AuthenticationService;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

	@Autowired
	AuthenticationService service;

	@PostMapping("/register/role/{roleId}")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request,@PathVariable Integer roleId) {
		return ResponseEntity.ok(service.register(request, roleId));
	}

	@PostMapping("/authenticate")
	public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
		return ResponseEntity.ok(service.authenticate(request));
	}
}