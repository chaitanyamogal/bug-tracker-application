package com.bugtracker;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
//
public class BugTrackerApisApplication {

	public static void main(String[] args) {
		SpringApplication.run(BugTrackerApisApplication.class, args);
	}

    @Bean
    ModelMapper modalMapper() {
        return new ModelMapper();
    }
}
