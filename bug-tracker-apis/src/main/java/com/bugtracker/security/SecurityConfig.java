package com.bugtracker.security;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebSecurity
@EnableWebMvc
@RequiredArgsConstructor
public class SecurityConfig {

	@Autowired
	JwtAuthenticationFilter jwtAuthFilter;
	@Autowired
	AuthenticationProvider authenticationProvider;
	@Autowired
	JwtAuthenticationEntryPoint entryPoint;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf()
		.disable()
		.authorizeHttpRequests()
		.requestMatchers("/api/auth/**","/api/companies","/api/user-role", "/swagger-ui/**", "/v3/api-docs/**")
		.permitAll()
		.anyRequest()
		.authenticated()
		.and()
		.sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and()
		.exceptionHandling().authenticationEntryPoint(entryPoint)
		.and()
		.authenticationProvider(authenticationProvider)
		.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}
	
	 @Bean
	    public FilterRegistrationBean coresFilter() {
	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

	        CorsConfiguration corsConfiguration = new CorsConfiguration();
	        corsConfiguration.setAllowCredentials(true);
	        corsConfiguration.addAllowedOriginPattern("*");
	        corsConfiguration.addAllowedHeader("Authorization");
	        corsConfiguration.addAllowedHeader("Content-Type");
	        corsConfiguration.addAllowedHeader("Accept");
	        corsConfiguration.addAllowedMethod("POST");
	        corsConfiguration.addAllowedMethod("GET");
	        corsConfiguration.addAllowedMethod("DELETE");
	        corsConfiguration.addAllowedMethod("PUT");
	        corsConfiguration.addAllowedMethod("OPTIONS");
	        corsConfiguration.setMaxAge(3600L);

	        source.registerCorsConfiguration("/**", corsConfiguration);

	        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));

	        bean.setOrder(-110);

	        return bean;
	    }
	 
}
