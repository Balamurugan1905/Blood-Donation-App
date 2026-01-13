import React, { useState,useEffect } from 'react';
import { Phone, Plus, Users, Heart, Calendar, MapPin, User, Mail, Search, Filter } from 'lucide-react';
import './BloodDonationApp.css';
import { insertDonor, listAllDonor } from '../service/DonorService';

const BloodDonationApp = () => {
  const [activeTab, setActiveTab] = useState('donors');
  const [donors, setDonors] = useState([]);

useEffect(() => {
  listAllDonor()
    .then(res => setDonors(res.data))
    .catch(err => console.error('Error fetching donors:', err));
}, []);


  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    bloodGroup: '',
    location: '',
    age: ''
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBloodGroup, setFilterBloodGroup] = useState('');

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ===== Validation Function =====
  const validateForm = () => {
    if (formData.name.trim() === "") {
      alert("Name is required");
      return false;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Phone number must be 10 digits");
      return false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Enter valid email");
      return false;
    }

    if (formData.bloodGroup === "") {
      alert("Select blood group");
      return false;
    }

    if (formData.age && (formData.age < 18 || formData.age > 65)) {
      alert("Age must be between 18 and 65");
      return false;
    }

    if (formData.location.trim() === "") {
      alert("Location is required");
      return false;
    }

    return true;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    const response = await insertDonor(formData);
    setDonors(prev => [...prev, response.data]);
    setFormData({ name: '', phone: '', email: '', bloodGroup: '', location: '', age: '' });
    setActiveTab('donors');
  } catch (err) {
    console.error('Error adding donor:', err);
  }
};



  const handleCall = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBloodGroup = filterBloodGroup === '' || donor.bloodGroup === filterBloodGroup;
    return matchesSearch && matchesBloodGroup;
  });

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
        <div className="header-container">
          <div className="logo-section">
            <Heart size={32} color="#e74c3c" />
            <h1 className="logo-title">SaveOne</h1>
          </div>
          
          <nav className="nav-container">
            <button
              onClick={() => setActiveTab('donors')}
              className={`nav-button ${activeTab === 'donors' ? 'active' : ''}`}
            >
              <Users size={18} />
              View Donors
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`nav-button ${activeTab === 'add' ? 'active' : ''}`}
            >
              <Plus size={18} />
              Add Donor
            </button>
          </nav>
        </div>
        <marquee>
            <h3 style={{color: "red"}}>Your blood is precious!{'\u00A0\u00A0'}Share it with those in need, Donate blood, gift a heartbeat!!</h3>
        </marquee>
      </div>

      <div className="main-container">
        {activeTab === 'donors' && (
          <div>
            {/* Search and Filter Section */}
            <div className="search-filter-container">
              <h2 className="search-title">Find Blood Donors</h2>
              
              <div className="search-controls">
                <div className="search-input-container">
                  <Search size={20} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
                
                <div className="filter-container">
                  <Filter size={20} className="filter-icon" />
                  <select
                    value={filterBloodGroup}
                    onChange={(e) => setFilterBloodGroup(e.target.value)}
                    className="filter-select"
                  >
                    <option value="">All Blood Groups</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stats-card total">
                <h3 className="stats-number">{donors.length}</h3>
                <p className="stats-label">Total Donors</p>
              </div>
              
              <div className="stats-card available">
                <h3 className="stats-number">
                  {donors.filter(d => d.availability === 'Available').length}
                </h3>
                <p className="stats-label">Available Now</p>
              </div>
              
              <div className="stats-card blood-groups">
                <h3 className="stats-number">
                  {new Set(donors.map(d => d.bloodGroup)).size}
                </h3>
                <p className="stats-label">Blood Groups</p>
              </div>
            </div>

            {/* Donors Grid */}
            <div className="donors-grid">
              {filteredDonors.map(donor => (
                <div key={donor.id} className="donor-card">
                  <div className="donor-header">
                    <div>
                      <h3 className="donor-name">{donor.name}</h3>
                      <div className={`blood-group-badge ${donor.bloodGroup.includes('+') ? 'blood-group-positive' : 'blood-group-negative'}`}>
                        {donor.bloodGroup}
                      </div>
                    </div>
                    
                    <div className={`availability-badge ${donor.availability === 'Available' ? 'availability-available' : 'availability-not-available'}`}>
                      {donor.availability}
                    </div>
                  </div>
                  
                  <div className="donor-details">
                    <div className="donor-detail-item">
                      <User size={16} />
                      <span>Age: {donor.age}</span>
                    </div>
                    
                    <div className="donor-detail-item">
                      <MapPin size={16} />
                      <span>{donor.location}</span>
                    </div>
                    
                    <div className="donor-detail-item">
                      <Mail size={16} />
                      <span>{donor.email}</span>
                    </div>
                    
                    <div className="donor-detail-item">
                      <Calendar size={16} />
                      <span>Last donation: {donor.lastDonation}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleCall(donor.phone)}
                    className="call-button"
                  >
                    <Phone size={18} />
                    Call {donor.phone}
                  </button>
                </div>
              ))}
            </div>
            
            {filteredDonors.length === 0 && (
              <div className="no-donors">
                <Users size={48} className="no-donors-icon" />
                <h3 className="no-donors-title">No donors found</h3>
                <p className="no-donors-text">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'add' && (
          <div className="form-container">
            <div className="form-card">
              <h2 className="form-title">Register as Blood Donor</h2>
              
              <div>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group-row">
                  <div className="form-group">
                    <label className="form-label">Blood Group *</label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
                      required
                      className="form-select"
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map(group => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      min="18"
                      max="65"
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, State"
                    className="form-input"
                  />
                </div>
                
                <button
                  onClick={handleSubmit}
                  className="submit-button"
                >
                  Register as Donor
                </button>
              </div>
            
            </div>
            
          </div>
        )}
      </div>

    </div>
    
  );
};

export default BloodDonationApp;
