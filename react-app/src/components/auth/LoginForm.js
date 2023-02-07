import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const onDemoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-page-container'>
    <div className='login-form-page-container' >
      <h1 className='login-form-header'>SurReel</h1>
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='login-form-input-area'>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='login-form-input-area'>
        <input
          // className=''
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <br></br>
      </div>
        <button type='submit' className='login-button'>Login</button>
        <br></br>
        <span className='dont-have-an-account'>Don't have an account?</span>
        <NavLink to={`/sign-up`} className='login-form-nav-link'>
        <span> Sign up</span>
        </NavLink>
        <br></br>
          <button className='demo-login-button' onClick={onDemoLogin}>Demo Login</button>
    </form>
    </div>
    </div>
  );
};

export default LoginForm;
