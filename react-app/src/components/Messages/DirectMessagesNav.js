import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadMessageServersThunk } from '../../store/messages';
import './DirectMessagesNav.css';

const DirectMessagesNav = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const messageServs = useSelector((state) => state.messages.messageServers)
  const user = useSelector((state) => state.session.user)

  useEffect(() => {

    if (user) {
      dispatch(loadMessageServersThunk());
    }
  }, [dispatch]);

  if (!user) {
    history.push('/login')
    return null;
  }

    if (messageServs === null) {
      return (
      <div className='dm-nav-username-container'>
      <h1 className='dm-nav-username'>{user.username}</h1>
    </div>
      )
    } else {
    return (
      <div className='dm-nav-content-container'>
      <div className='dm-nav-username-container'>
        <h1 className='dm-nav-username'>{user.username}</h1>
      </div>
      {messageServs && Object.values(messageServs).map((serv) => {
        let members = serv.members
        let resMembers = []

         // Checks to see if only the owner is a member of the server
         if (members.length === 1) return

        // Find the current used and remove them from the array
        members.forEach((member) => {
          if (member.member.id !== user.id) resMembers.push(member)
        })

        return(
        <div key={serv.id} className='dm-nav-chat-button-div'>
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
        )
      })}
      </div>
    )
  }
}


export default DirectMessagesNav;
