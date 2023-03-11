package com.bugtracker.security;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bugtracker.entities.User;
import com.bugtracker.exceptions.ResourceNotFoundException;
import com.bugtracker.repositories.UserRepo;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepo userRepo;

	@Autowired
	ModelMapper modelMapper;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		// loading user from database by username
		User user = this.userRepo.findByEmail(username)
				.orElseThrow(() -> new ResourceNotFoundException("User ", " email : " + username, 0));

		return this.modelMapper.map(user, UserDetails.class);
	}

}