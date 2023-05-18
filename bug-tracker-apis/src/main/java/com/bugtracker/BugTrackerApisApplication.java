package com.bugtracker;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;

@SpringBootApplication()
@OpenAPIDefinition
public class BugTrackerApisApplication {

	public static void main(String[] args) {
		SpringApplication.run(BugTrackerApisApplication.class, args);
	}

	@Bean
	ModelMapper modalMapper() {
		return new ModelMapper();
	}

	@Bean
	public WebMvcConfigurer configure() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry reg) {
				//reg.addMapping("/**").allowedOrigins("http://localhost:3000");
				reg.addMapping("/**").allowedOrigins("https://buglog.tech");
			}
		};
	}
}
