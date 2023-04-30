package com.bugtracker.payloads;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

	private UserDto user;
	private String token;

}