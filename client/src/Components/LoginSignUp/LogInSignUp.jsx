import React, { useState } from 'react';
import './LoginSignUp.css';
import user_icon from '../../assets/person.png';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';

const LoginSignUp = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">{isSignUp ? 'Sign Up' : 'Login'}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="User Icon" />
          <input type="text" placeholder="Username" />
        </div>
        <div className="input">
          <img src={email_icon} alt="Email Icon" />
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <img src={password_icon} alt="Password Icon" />
          <input type="password" placeholder="Password" />
        </div>
        {!isSignUp && (
          <div className="input">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember Me</label>
          </div>
        )}
      </div>
      <div className="forgot-password">
        Lost Password? <span>Click Here</span>
      </div>
      <div className="submit-container">
        <div className="submit" onClick={toggleSignUp}>
          {isSignUp ? 'Login' : 'Sign Up'}
        </div>
        <div className="submit">{isSignUp ? 'Sign Up' : 'Login'}</div>
      </div>
    </div>
  );
};

export default LoginSignUp;
