import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

const NavBar = () => {
  const user = useSelector((state) => state.session.user)

  if (!user) {
    return (
      <nav className='nav-bar'>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>

          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
      </nav>
    );
  } else {
    return (
      <nav className='nav-bar'>
        <NavLink to='/' exact={true} className='nav-link-home'>
        <h2 className='navbar-sureel-span'>SurReel</h2>
        </NavLink>
        <div className='navbar-buttons-container'>
          <div className='nav-bar-home-container'>
            <NavLink to='/' exact={true} className='nav-link-home-area' activeClassName='active'>
            <img src='https://i.ibb.co/VWZjy0J/8723112-home-icon-1.png' className='nav-home-icon'></img>
              <span className='nav-link-home-span'>Home</span>
            </NavLink>
            <br></br>
          </div>
          <div className='nav-bar-create-container'>
          <NavLink to='/create' exact={true} className='nav-link-home-area' activeClassName='active'>
            <img src='https://i.ibb.co/q0wY2b6/8757645-new-post-post-media-tool-application-icon-1.png' className='nav-create-icon'></img>
              <span className='nav-link-home-span'>Create</span>
            </NavLink>
          </div>
          <NavLink to='/messages' exact={true} activeClassName='active' className='nav-link-home-area'>
          <img src='https://surreel-app-images.s3.amazonaws.com/assets/send_icon.png' className='nav-messages-icon'></img>
              <span className='nav-link-messages-span' >Messages</span>
            </NavLink>
            <NavLink to='/users' exact={true} activeClassName='active' className='nav-link-home-area'>
            <img src='https://surreel-app-images.s3.amazonaws.com/assets/user_icon.png' className='nav-user-icon'></img>
              <span className='nav-link-users-span' >Users</span>
            </NavLink>
        </div>
        <div className='nav-bar-logout-container'>
        <LogoutButton className='nav-bar-logout'/>
        </div>
      </nav>
    );
  }
}

export default NavBar;
