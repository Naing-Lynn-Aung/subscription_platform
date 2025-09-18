import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../forms.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Reusable input field component
function InputField({ type, name, value, onChange, errorMsg, label }) {
  const hasError = !!errorMsg;
  return (
    <div className="form-group floating-label-group mb-3">
      <input
        type={type}
        className={`form-control${hasError ? ' is-invalid error-border-color' : ''}`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
      />
      <label htmlFor={name} className={`floating-label${hasError ? ' floating-label-error' : ''}`}>
        {hasError ? errorMsg : label}
      </label>
    </div>
  );
}

// Prop types for InputField
InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  errorMsg: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);

  // Input change handler
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submission handler
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/v1/users',
        { user: formData },
        { headers: { 'Content-Type': 'application/json' } });
      navigate('/login');
    } catch (error) {
      setIsError(true);
      setErrorMsg(error.response.data.errors);
    }
  }

  // Helper to get error message for a field
  const getFieldError = (field) => {
    if (!isError) return null;
    if (field === 'password') {
      return errorMsg.find(msg => msg.toLowerCase().includes('password') && !msg.toLowerCase().includes('confirmation')) || null;
    }
    if (field === 'password_confirmation' || field === 'confirmation') {
      return errorMsg.find(msg => msg.toLowerCase().includes('confirmation')) || null;
    }
    return errorMsg.find(msg => msg.toLowerCase().includes(field)) || null;
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
      <div className="col-12 col-sm-10 col-md-6 col-lg-5 col-xl-4">
        <div className="card p-4 shadow-sm">
          <div className="card-body">
            <span className="fw-normal text-muted">Start your journey</span>
            <h3 className="fw-bold mb-4">Sign Up to Platform</h3>
            <form>
              <InputField
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                errorMsg={getFieldError('name')}
                label="Name"
              />
              <InputField
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                errorMsg={getFieldError('email')}
                label="Email address"
              />
              <InputField
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                errorMsg={getFieldError('password')}
                label="Password"
              />
              <InputField
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                errorMsg={getFieldError('password_confirmation')}
                label="Repeat password"
              />
              <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>Sign up</button>
            </form>
            <div className="text-center mt-3">
              Already have an account? <a href="/login">Sign in</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
