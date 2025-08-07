package com.bda.blood_donation_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bda.blood_donation_api.model.Donor;

@Repository
public interface DonorRepository extends JpaRepository<Donor, Long> {
	
}

