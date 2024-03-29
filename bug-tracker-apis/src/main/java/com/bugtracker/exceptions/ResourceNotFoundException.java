package com.bugtracker.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{
//	String resourceName;
//	String fieldName;
//	long fieldValue;
//	public ResourceNotFoundException(String resourceName, String fieldName, long fieldValue) {
//		super(String.format("%s not found with %s : %l", resourceName, fieldName, fieldValue));
//		this.resourceName = resourceName;
//		this.fieldName = fieldName;
//		this.fieldValue = fieldValue;
//	}
//	public String getResourceName() {
//		return resourceName;
//	}
//	public void setResourceName(String resourceName) {
//		this.resourceName = resourceName;
//	}
//	public String getFieldName() {
//		return fieldName;
//	}
//	public void setFieldName(String fieldName) {
//		this.fieldName = fieldName;
//	}
//	public long getFieldValue() {
//		return fieldValue;
//	}
//	public void setFieldValue(long fieldValue) {
//		this.fieldValue = fieldValue;
//	}
	
	private static final long serialVersionUID = 1L;

	public ResourceNotFoundException(String message) {
		super(message);
	}
	
	
}
