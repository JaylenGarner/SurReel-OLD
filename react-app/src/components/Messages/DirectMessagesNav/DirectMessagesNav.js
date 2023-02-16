import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { loadRoomsThunk } from '../../../store/rooms';
import { clearMessages } from '../../../store/messages';
import { io } from 'socket.io-client';
import './DirectMessagesNav.css';
let socket;


const DirectMessagesNav = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const rooms = useSelector((state) => state.rooms)
  const user = useSelector((state) => state.session.user)

  useEffect(() => {

    if (user) {
      dispatch(loadRoomsThunk());
    }
  }, [dispatch]);

  if (!user) {
    history.push('/login')
    return null;
  }

    if (rooms === null) {
      return (
      <div className='dm-nav-username-container'>
      <h1 className='dm-nav-username'>{user.username}</h1>
      <NavLink to={'/messages/create'}>
      <img className='componse-message-icon' src={'https://surreel-app-images.s3.amazonaws.com/assets/componse_icon_white.png'}></img>
      </NavLink>
    </div>)
    } else {
    return (
      <div className='dm-nav-content-container'>
      <div className='dm-nav-username-container'>
        <h1 className='dm-nav-username'>{user.username}</h1>
        <NavLink to={'/messages/create'}>
        <img className='componse-message-icon' src={'https://surreel-app-images.s3.amazonaws.com/assets/componse_icon_white.png'}></img>
        </NavLink>
      </div>
      {rooms && Object.values(rooms).map((room) => {
        let members = room.members
        let resMembers = []

         // Checks to see if only the owner is a member of the server
         if (members.length === 1) return

        // Find the current used and remove them from the array
        members.forEach((member) => {
          if (member.member.id !== user.id) resMembers.push(member)
        })

        return(
          <NavLink to={`/messages/${room.id}`} className='nav-link'>
        <div key={room.id} className='dm-nav-chat-button-div'>
          {resMembers.map((member) => {

            // Conditional logic to determine who the last user is. A comma will not be displayed for them
            if (resMembers.indexOf(member) !== resMembers.length - 1) {
              return <span>{member.member.username}, </span>
            } else {
              return (
              <span>{member.member.username}</span>)
            }
          })}
        </div>
        </NavLink>
        )
      })}
      </div>
    )
  }
}


export default DirectMessagesNav;
