package com.bda.blood_donation_api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Donor {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String name;
	    private String phone;
	    private String email;
	    private String bloodGroup;
	    private String location;
	    private int age;
	    private String lastDonation = "Never";
	    private String availability = "Available";
	    
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getPhone() {
			return phone;
		}
		public void setPhone(String phone) {
			this.phone = phone;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getBloodGroup() {
			return bloodGroup;
		}
		public void setBloodGroup(String bloodGroup) {
			this.bloodGroup = bloodGroup;
		}
		public String getLocation() {
			return location;
		}
		public void setLocation(String location) {
			this.location = location;
		}
		public int getAge() {
			return age;
		}
		public void setAge(int age) {
			this.age = age;
		}
		public String getLastDonation() {
			return lastDonation;
		}
		public void setLastDonation(String lastDonation) {
			this.lastDonation = lastDonation;
		}
		public String getAvailability() {
			return availability;
		}
		public void setAvailability(String availability) {
			this.availability = availability;
		}
		public Donor(Long id, String name, String phone, String email, String bloodGroup, String location, int age,
				String lastDonation, String availability) {
			super();
			this.id = id;
			this.name = name;
			this.phone = phone;
			this.email = email;
			this.bloodGroup = bloodGroup;
			this.location = location;
			this.age = age;
			this.lastDonation = lastDonation;
			this.availability = availability;
		}

	    public Donor() {
	    	
	    }
}



