package com.bugtracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
//
public class BugTrackerApisApplication {

	public static void main(String[] args) {
		SpringApplication.run(BugTrackerApisApplication.class, args);
	}

}
