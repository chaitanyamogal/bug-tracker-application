package com.bugtracker.payloads;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {

	private String email;

	String password;

}
