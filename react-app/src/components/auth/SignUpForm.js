import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('')
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      if (!errors.includes("Passwords do not match.")) setErrors([...errors, "Passwords do not match."])
    } else {
      const data = await dispatch(signUp(username, email, password, image));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateImage = (e) => {
    setImage(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-page-container'>
      <div className='login-form-page-container' >
      <h1 className='login-form-header'>SurReel</h1>
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='login-form-input-area'>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          placeholder='Username'
        ></input>
      </div>
      <div className='login-form-input-area'>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          placeholder='Email'
        ></input>
      </div>
      <div className='login-form-input-area'>
        <input
          type='text'
          name='image'
          onChange={updateImage}
          value={image}
          placeholder='Enter a valid image url'
        ></input>
      </div>
      <div className='login-form-input-area'>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          placeholder='Password'
        ></input>
      </div>
      <div className='login-form-input-area'>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          placeholder='Confirm Password'
        ></input>
      </div>
      <button type='submit' className='login-button'>Sign Up</button>
      <br></br>
        <span >Already have an account?</span>
        <NavLink to={`/login`} className='login-form-nav-link'>
        <span> Login</span>
        </NavLink>
    </form>
    </div>
    </div>
  );
};

export default SignUpForm;
