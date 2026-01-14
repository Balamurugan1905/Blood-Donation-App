import React, { useState } from "react";
import { Lock, User, Eye, EyeOff, AlertCircle } from "lucide-react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

const handleLogin = async () => {
  setError("");

  if (!username.trim()) {
    setError("Username is required");
    return;
  }

  if (!password) {
    setError("Password is required");
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch("https://saveone.onrender.com/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const isValid = await response.json(); // true or false

    if (isValid === true) {
      window.location.href = "/admin";
    } else {
      setError("Invalid username or password");
    }
  } catch (err) {
    setError("Login failed. Please try again.");
    console.error("Login error:", err);
  } finally {
    setIsLoading(false);
  }
};

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
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

        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%);
          padding: 20px;
        }

        .login-card {
          width: 100%;
          max-width: 380px;
          background: #ffffff;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .login-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .login-title {
          font-size: 22px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 6px;
        }

        .login-subtitle {
          font-size: 13px;
          color: #718096;
          font-weight: 500;
        }

        .error-message {
          background: #fff5f5;
          border: 1px solid #fc8181;
          color: #c53030;
          padding: 10px 12px;
          border-radius: 8px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
        }

        .form-group {
          margin-bottom: 18px;
        }

        .form-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 8px;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #a0aec0;
        }

        .form-input {
          width: 100%;
          padding: 10px 12px 10px 38px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
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

        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #a0aec0;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s ease;
        }

        .password-toggle:hover {
          color: #ff6b6b;
        }

        .login-button {
          width: 100%;
          padding: 11px;
          background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 8px;
          box-shadow: 0 2px 8px rgba(255, 107, 107, 0.25);
        }

        .login-button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 107, 107, 0.35);
        }

        .login-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2 className="login-title">Admin Login</h2>
            <p className="login-subtitle">Enter your credentials</p>
          </div>

          {error && (
            <div className="error-message">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Username</label>
            <div className="input-wrapper">
              <User className="input-icon" size={16} />
              <input
                type="text"
                className="form-input"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={16} />
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button 
            className="login-button" 
            disabled={isLoading}
            onClick={handleLogin}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;