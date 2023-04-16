import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

const NavBar = () => {
  const user = useSelector((state) => state.session.user)

  if (!user) {
    return <></>
  } else {
    return (
      <nav className='nav-bar'>
        <a href='https://github.com/JaylenGarner/SurReel'>
        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" class="github-logo"></img>
        </a>


        <NavLink to='/' exact={true} className='nav-link-home'>
        <h2 className='navbar-sureel-span'>SurReel</h2>
        </NavLink>
        <div className='navbar-buttons-container'>
            <NavLink to='/' exact={true} className='nav-link-home-area' activeClassName='active'>
          <div className='nav-bar-home-container'>
            <img src='https://i.ibb.co/VWZjy0J/8723112-home-icon-1.png' className='nav-home-icon'></img>
              <span className='nav-link-home-span'>Home</span>
          </div>
            </NavLink>
          <NavLink to='/create' exact={true} className='nav-link-home-area' activeClassName='active'>
          <div className='nav-bar-home-container'>
            <img src='https://i.ibb.co/q0wY2b6/8757645-new-post-post-media-tool-application-icon-1.png' className='nav-create-icon'></img>
              <span className='nav-link-home-span'>Create</span>
          </div>
            </NavLink>
          <NavLink to='/messages' exact={true} activeClassName='active' className='nav-link-home-area'>
            <div className='nav-bar-home-container'>
          <img src='https://surreel-app-images.s3.amazonaws.com/assets/send_icon.png' className='nav-messages-icon'></img>
              <span className='nav-link-messages-span' >Messages</span>
            </div>
            </NavLink>
            <NavLink to='/users' exact={true} activeClassName='active' className='nav-link-home-area'>
              <div className='nav-bar-home-container'>
            <img src='https://surreel-app-images.s3.amazonaws.com/assets/user_icon.png' className='nav-user-icon'></img>
              <span className='nav-link-users-span' >Users</span>
              </div>
            </NavLink>
        </div>
        <div className='nav-bar-logout-container'>
        <NavLink to={`/users/${user.id}/profile`}>
          <img src={user.image} className='nav-bar-user-image'></img>
        </NavLink>
        <LogoutButton className='nav-bar-logout'/>
        </div>
      </nav>
    );
  }
}

export default NavBar;
