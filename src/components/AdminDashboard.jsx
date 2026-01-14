import React, { useEffect, useState } from "react";
import { Users, Droplet, MapPin, Edit, Trash2, LogOut, Activity, TrendingUp, Menu, X } from "lucide-react";

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [donors, setDonors] = useState([]);
  const [editDonor, setEditDonor] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const res = await fetch("http://localhost:8080/donors");
      const data = await res.json();
      setDonors(data);
    } catch (err) {
      console.error("Error fetching donors", err);
    }
  };

  const handleUpdate = async () => {
    if (!validateEditForm()) return;

    try {
      await fetch(`http://localhost:8080/donors/${editDonor.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editDonor)
      });
      setEditDonor(null);
      fetchDonors();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const validateEditForm = () => {
    if (!editDonor.name.trim()) {
      alert("Name is required");
      return false;
    }

    if (!/^\d{10}$/.test(editDonor.phone)) {
      alert("Phone number must be 10 digits");
      return false;
    }

    if (editDonor.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editDonor.email)) {
      alert("Enter valid email");
      return false;
    }

    if (!editDonor.bloodGroup) {
      alert("Select blood group");
      return false;
    }

    if (editDonor.age < 18 || editDonor.age > 65) {
      alert("Age must be between 18 and 65");
      return false;
    }

    if (!editDonor.location.trim()) {
      alert("Location is required");
      return false;
    }

    return true;
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this donor?")) return;
    try {
      await fetch(`http://localhost:8080/donors/${id}`, {
        method: 'DELETE'
      });
      fetchDonors();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setSidebarOpen(false);
  };

  const renderContent = () => {
    if (activeMenu === "dashboard") {
      return (
        <div className="dashboard-content">
          <div className="header-section">
            <h1 className="page-title">Dashboard Overview</h1>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card stat-card-1">
              <div className="stat-icon-wrapper stat-icon-1">
                <Users size={28} />
              </div>
              <div className="stat-content">
                <h3 className="stat-label">Total Donors</h3>
                <p className="stat-value">{donors.length}</p>
                <span className="stat-badge">Active</span>
              </div>
            </div>
            
            <div className="stat-card stat-card-2">
              <div className="stat-icon-wrapper stat-icon-2">
                <Droplet size={28} />
              </div>
              <div className="stat-content">
                <h3 className="stat-label">Available Donors</h3>
                <p className="stat-value">{donors.filter(d => d.availability === "Available").length}</p>
                <span className="stat-badge">Ready</span>
              </div>
            </div>
            
            <div className="stat-card stat-card-3">
              <div className="stat-icon-wrapper stat-icon-3">
                <MapPin size={28} />
              </div>
              <div className="stat-content">
                <h3 className="stat-label">Locations</h3>
                <p className="stat-value">{new Set(donors.map(d => d.location)).size}</p>
                <span className="stat-badge">Cities</span>
              </div>
            </div>
            
            <div className="stat-card stat-card-4">
              <div className="stat-icon-wrapper stat-icon-4">
                <Activity size={28} />
              </div>
              <div className="stat-content">
                <h3 className="stat-label">Success Rate</h3>
                <p className="stat-value">98%</p>
                <span className="stat-badge">Excellent</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeMenu === "donors") {
      return (
        <div className="donors-content">
          <div className="header-section">
            <h1 className="page-title">Donor Management</h1>
          </div>
          
          <div className="table-container">
            <div className="table-wrapper">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Blood Group</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {donors.map(d => (
                    <tr key={d.id}>
                      <td data-label="Name">
                        <div className="donor-name">{d.name}</div>
                      </td>
                      <td data-label="Blood Group">
                        <span className="blood-badge">{d.bloodGroup}</span>
                      </td>
                      <td data-label="Phone">{d.phone}</td>
                      <td data-label="Location">
                        <span className="location-tag">{d.location}</span>
                      </td>
                      <td data-label="Actions">
                        <div className="action-buttons">
                          <button className="action-btn edit-btn" onClick={() => setEditDonor(d)}>
                            <Edit size={16} />
                          </button>
                          <button className="action-btn delete-btn" onClick={() => handleDelete(d.id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {editDonor && (
            <div className="edit-modal-overlay">
              <div className="edit-modal">
                <h3 className="modal-title">Edit Donor Information</h3>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      value={editDonor.name}
                      onChange={(e) => setEditDonor({ ...editDonor, name: e.target.value })}
                      placeholder="Enter full name"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      value={editDonor.phone}
                      onChange={(e) => setEditDonor({ ...editDonor, phone: e.target.value })}
                      placeholder="10-digit phone number"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      value={editDonor.email}
                      onChange={(e) => setEditDonor({ ...editDonor, email: e.target.value })}
                      placeholder="email@example.com"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Blood Group</label>
                    <select
                      value={editDonor.bloodGroup}
                      onChange={(e) => setEditDonor({ ...editDonor, bloodGroup: e.target.value })}
                      className="form-input"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Age</label>
                    <input
                      type="number"
                      value={editDonor.age}
                      onChange={(e) => setEditDonor({ ...editDonor, age: e.target.value })}
                      placeholder="Age (18-65)"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Location</label>
                    <input
                      value={editDonor.location}
                      onChange={(e) => setEditDonor({ ...editDonor, location: e.target.value })}
                      placeholder="City/Location"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="modal-actions">
                  <button onClick={handleUpdate} className="btn-save">Update Donor</button>
                  <button onClick={() => setEditDonor(null)} className="btn-cancel">Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (activeMenu === "reports") {
      return (
        <div className="reports-content">
          <div className="header-section">
            <h1 className="page-title">Reports & Analytics</h1>
          </div>
          <div className="coming-soon">
            <TrendingUp size={64} className="coming-soon-icon" />
            <h2>Analytics Dashboard</h2>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background: #ffffff;
          position: relative;
        }

        .mobile-header {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: #fff;
          padding: 15px 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          z-index: 999;
          align-items: center;
          justify-content: space-between;
        }

        .mobile-header-title {
          color: #ff6b6b;
          font-size: 20px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .mobile-header-title::before {
          content: '❤️';
          font-size: 24px;
        }

        .hamburger-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
          color: #ff6b6b;
        }

        .sidebar {
          width: 280px;
          background: #fef9f9;
          padding: 30px 0;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
          position: relative;
          overflow: hidden;
          border-right: 1px solid #ffe5e5;
          transition: transform 0.3s ease;
        }

        .sidebar-header {
          padding: 0 25px 30px;
          border-bottom: 1px solid #ffe5e5;
        }

        .admin-title {
          color: #ff6b6b;
          font-size: 24px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .admin-title::before {
          content: '❤️';
          font-size: 28px;
        }

        .menu-section {
          padding: 20px 0;
        }

        .menu-item {
          margin: 8px 15px;
          padding: 14px 20px;
          cursor: pointer;
          font-weight: 600;
          color: #6b7280;
          border-radius: 12px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }

        .menu-item:hover {
          background: #ffe5e5;
          color: #ff6b6b;
          transform: translateX(5px);
        }

        .menu-item.active {
          background: #ff6b6b;
          color: #fff;
          box-shadow: 0 4px 12px rgba(255, 107, 107, 0.25);
        }

        .logout-item {
          margin-top: 20px;
          border-top: 1px solid #ffe5e5;
          padding-top: 20px;
        }

        .main-content {
          flex: 1;
          padding: 40px;
          background: #fafafa;
          overflow-y: auto;
        }

        .header-section {
          margin-bottom: 35px;
        }

        .page-title {
          font-size: 32px;
          font-weight: 800;
          color: #2d3748;
          margin-bottom: 8px;
        }

        .page-subtitle {
          font-size: 16px;
          color: #718096;
          font-weight: 500;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
          margin-top: 30px;
        }

        .stat-card {
          background: #fff;
          padding: 28px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          border: 1px solid #f0f0f0;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }

        .stat-icon-wrapper {
          width: 70px;
          height: 70px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
        }

        .stat-content {
          flex: 1;
        }

        .stat-label {
          font-size: 13px;
          color: #718096;
          font-weight: 600;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-value {
          font-size: 36px;
          font-weight: 800;
          color: #2d3748;
          line-height: 1;
          margin-bottom: 8px;
        }

        .stat-badge {
          display: inline-block;
          padding: 4px 12px;
          background: #fff5f5;
          color: #ff6b6b;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .table-container {
          background: #fff;
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          margin-top: 30px;
          border: 1px solid #f0f0f0;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .modern-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          min-width: 600px;
        }

        .modern-table thead tr {
          background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
        }

        .modern-table th {
          padding: 18px 20px;
          text-align: left;
          color: #fff;
          font-weight: 700;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .modern-table th:first-child {
          border-top-left-radius: 10px;
        }

        .modern-table th:last-child {
          border-top-right-radius: 10px;
        }

        .modern-table tbody tr {
          border-bottom: 1px solid #f0f0f0;
          transition: all 0.2s ease;
        }

        .modern-table tbody tr:hover {
          background: #fafafa;
        }

        .modern-table td {
          padding: 20px;
          color: #4a5568;
          font-weight: 500;
        }

        .donor-name {
          font-weight: 700;
          color: #2d3748;
        }

        .blood-badge {
          display: inline-block;
          padding: 6px 14px;
          background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
          color: #fff;
          border-radius: 20px;
          font-weight: 700;
          font-size: 13px;
        }

        .location-tag {
          color: #718096;
          font-size: 14px;
        }

        .action-buttons {
          display: flex;
          gap: 10px;
        }

        .action-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .edit-btn {
          background: #4299e1;
          color: #fff;
        }

        .edit-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(66, 153, 225, 0.4);
        }

        .delete-btn {
          background: #fc8181;
          color: #fff;
        }

        .delete-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(252, 129, 129, 0.4);
        }

        .edit-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .edit-modal {
          background: #fff;
          border-radius: 20px;
          padding: 40px;
          max-width: 700px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease;
          max-height: 90vh;
          overflow-y: auto;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-title {
          font-size: 26px;
          font-weight: 800;
          color: #2d3748;
          margin-bottom: 30px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-size: 13px;
          font-weight: 700;
          color: #4a5568;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-input {
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 500;
          color: #2d3748;
          transition: all 0.2s ease;
          background: #fff;
        }

        .form-input:focus {
          outline: none;
          border-color: #ff6b6b;
          box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
        }

        .modal-actions {
          display: flex;
          gap: 15px;
          justify-content: flex-end;
        }

        .btn-save, .btn-cancel {
          padding: 12px 28px;
          border: none;
          border-radius: 10px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-save {
          background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
          color: #fff;
        }

        .btn-save:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(255, 107, 107, 0.4);
        }

        .btn-cancel {
          background: #e2e8f0;
          color: #4a5568;
        }

        .btn-cancel:hover {
          background: #cbd5e0;
        }

        .coming-soon {
          text-align: center;
          padding: 80px 20px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #f0f0f0;
        }

        .coming-soon-icon {
          color: #ff6b6b;
          margin-bottom: 20px;
        }

        .coming-soon h2 {
          font-size: 28px;
          font-weight: 800;
          color: #2d3748;
          margin-bottom: 12px;
        }

        .coming-soon p {
          font-size: 16px;
          color: #718096;
        }

        /* Tablet Styles */
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .main-content {
            padding: 30px;
          }

          .page-title {
            font-size: 28px;
          }
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .mobile-header {
            display: flex;
          }

          .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            z-index: 1000;
            transform: translateX(-100%);
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .main-content {
            padding: 20px;
            padding-top: 80px;
            width: 100%;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .stat-card {
            padding: 20px;
          }

          .stat-icon-wrapper {
            width: 60px;
            height: 60px;
          }

          .stat-value {
            font-size: 28px;
          }

          .page-title {
            font-size: 24px;
          }

          .table-container {
            padding: 20px;
            overflow-x: auto;
          }

          .form-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .edit-modal {
            padding: 25px;
          }

          .modal-title {
            font-size: 22px;
          }

          .modal-actions {
            flex-direction: column;
          }

          .btn-save, .btn-cancel {
            width: 100%;
          }

          .coming-soon {
            padding: 60px 20px;
          }

          .coming-soon-icon {
            width: 48px;
            height: 48px;
          }

          .coming-soon h2 {
            font-size: 22px;
          }
        }

        /* Small Mobile Styles */
        @media (max-width: 480px) {
          .mobile-header {
            padding: 12px 15px;
          }

          .mobile-header-title {
            font-size: 18px;
          }

          .main-content {
            padding: 15px;
            padding-top: 70px;
          }

          .page-title {
            font-size: 20px;
          }

          .stat-card {
            flex-direction: column;
            text-align: center;
            padding: 20px 15px;
          }

          .stat-icon-wrapper {
            width: 50px;
            height: 50px;
          }

          .stat-value {
            font-size: 24px;
          }

          .table-container {
            padding: 15px;
          }

          .modern-table th,
          .modern-table td {
            padding: 12px 10px;
            font-size: 13px;
          }

          .action-buttons {
            gap: 8px;
          }

          .action-btn {
            width: 32px;
            height: 32px;
          }

          .edit-modal {
            padding: 20px;
          }

          .header-section {
            margin-bottom: 25px;
          }
        }

        /* Sidebar overlay for mobile */
        @media (max-width: 768px) {
          .sidebar-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
          }

          .sidebar-overlay.open {
            display: block;
          }
        }
      `}</style>

      <div className="dashboard-container">
        <div className="mobile-header">
          <div className="mobile-header-title">Save One</div>
          <button className="hamburger-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)} />

        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <div className="admin-title">Save One</div>
          </div>
          
          <div className="menu-section">
            <div 
              className={`menu-item ${activeMenu === "dashboard" ? "active" : ""}`}
              onClick={() => handleMenuClick("dashboard")}
            >
              <Activity size={20} />
              Dashboard
            </div>
            <div 
              className={`menu-item ${activeMenu === "donors" ? "active" : ""}`}
              onClick={() => handleMenuClick("donors")}
            >
              <Users size={20} />
              Donor Management
            </div>
            <div 
              className={`menu-item ${activeMenu === "reports" ? "active" : ""}`}
              onClick={() => handleMenuClick("reports")}
            >
              <TrendingUp size={20} />
              Reports
            </div>
            <div className="menu-item logout-item" onClick={() => window.location.href = "/"}>
              <LogOut size={20} />
              Logout
            </div>
          </div>
        </div>

        <div className="main-content">
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;