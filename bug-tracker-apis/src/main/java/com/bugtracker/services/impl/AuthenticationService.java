package com.bugtracker.services.impl;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bugtracker.entities.Role;
import com.bugtracker.entities.User;
import com.bugtracker.entities.UserRole;
import com.bugtracker.exceptions.ResourceNotFoundException;
import com.bugtracker.payloads.AuthenticationRequest;
import com.bugtracker.payloads.AuthenticationResponse;
import com.bugtracker.payloads.RegisterRequest;
import com.bugtracker.repositories.UserRepo;
import com.bugtracker.repositories.UserRoleRepo;
import com.bugtracker.security.JwtService;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	@Autowired
	UserRepo userRepo;
	@Autowired
	UserRoleRepo userRoleRepo;
	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	JwtService jwtService;
	@Autowired
	AuthenticationManager authenticationManager;

	public AuthenticationResponse register(RegisterRequest request, Integer roleId) {
		
		UserRole userRole = this.userRoleRepo.findById(roleId).orElseThrow(() -> new ResourceNotFoundException("Role Not exist"));
		
		
		var user = User.builder()
				.name(request.getName())
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))
				.userRole(userRole)
				.build();
		var savedUser = userRepo.save(user);
		var jwtToken = jwtService.generateToken(user);
		return AuthenticationResponse.builder().token(jwtToken).build();
	}

	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
		var user = userRepo.findByEmail(request.getEmail()).orElseThrow();
		var jwtToken = jwtService.generateToken(user);
//		revokeAllUserTokens(user);
//		saveUserToken(user, jwtToken);
		return AuthenticationResponse.builder().token(jwtToken).build();
	}

//	private void saveUserToken(User user, String jwtToken) {
//		var token = Token.builder().user(user).token(jwtToken).tokenType(TokenType.BEARER).expired(false).revoked(false)
//				.build();
//		tokenRepository.save(token);
//	}
//
//	private void revokeAllUserTokens(User user) {
//		var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
//		if (validUserTokens.isEmpty())
//			return;
//		validUserTokens.forEach(token -> {
//			token.setExpired(true);
//			token.setRevoked(true);
//		});
//		tokenRepository.saveAll(validUserTokens);
//	}
}