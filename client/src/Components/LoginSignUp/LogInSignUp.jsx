import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Moved this to the top
import './LoginSignUp.css';

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Use hook here, outside of any other functions

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post('/api/login', {
          email: formData.email,
          password: formData.password
        });
        setMessage(response.data.msg);
      } else {
        const response = await axios.post('/api/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          passwordConfirmation: formData.passwordConfirmation
        });
        setMessage(response.data.msg);
        
        // Redirect to verification page after successful registration
        if (response.data.success) {
          navigate('/verification');
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Something went wrong!');
    }
  };

  return (
    <div className="login-signup">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {!isLogin && (
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginSignUp;
