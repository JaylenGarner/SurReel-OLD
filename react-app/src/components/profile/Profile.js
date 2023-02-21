import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfilePosts from './ProfilePosts/ProfilePosts';
import { loadFollowersThunk } from '../../store/follows';
import { loadFollowingThunk } from '../../store/follows';
import Modal from 'react-modal'
import FollowButton from './Profile/FollowButton/FollowButton';
import FollowersModalContent from './FollowModalContent/FollowersModalContent';
import FollowingModalContent from './FollowModalContent/FollowingModalContent';
import './Profile.css';

function Profile() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  let posts = useSelector((state) => state.posts)
  let followers = useSelector((state) => state.follows.followers)
  let following = useSelector((state) => state.follows.following)

  const [followerModalIsOpen, setFollowerModalIsOpen] = useState(false);
  const [followingModalIsOpen, setFollowingModalIsOpen] = useState(false);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();

    dispatch(loadFollowersThunk(userId))
    dispatch(loadFollowingThunk(userId))

  }, [userId, dispatch]);

  if (!user) return null;
  if (!posts) posts = 0
  if (!followers) followers = 0
  if (!following) following = 0
  // if (followers) setFollowLength(Object.keys(followers).length)

  const postCount = () => {
    let count = 0;

    Object.values(posts).forEach((post) => {
      if (post.owner_id == userId) count++;
    })

    return count;
  }

  return (
    <div className='profile-container'>
        <div className='profile-info-area'>
          <div className='profile-user-image-container'>
            <img src={user.image} className='profile-user-image'></img>
          </div>
            <div>
              <div className='profile-user-username-container'>
            <span className='profile-user-username'>{user.username}</span>
             <FollowButton targetUserId={user.id} followers={followers} following={following} />
            </div>
            <div className='profile-stats-area'>
              {posts && <div>
                <span className='profile-count-numbers'>{postCount()} </span>
                <span className='profile-count-labels'>posts </span>
              </div>}
              <Modal
              isOpen={followerModalIsOpen}
              style={{
                content: {
                  width: '400px',
                  height: '400px',
                  top: '18%',
                  left: '42%',
                  backgroundColor: '#262626',
                  color: 'white',
                }
              }}
              >
                <div className='profile-following-modal-header-container'>
                  <span className='profile-following-modal-header-text'>Followers</span>
                </div>
                <button onClick={() => setFollowerModalIsOpen(false)} className='profile-following-modal-close-button'>X</button>
                <FollowersModalContent setFollowerModalIsOpen={setFollowerModalIsOpen}/>
             </Modal>
              {followers && <div>
                <span onClick={() => setFollowerModalIsOpen(true)} className='profile-count-numbers profile-open-followers'>{Object.keys(followers).length} </span>
                <span onClick={() => setFollowerModalIsOpen(true)} className='profile-count-labels profile-open-followers'>followers </span>
              </div>}
              <Modal
              isOpen={followingModalIsOpen}
              style={{
                content: {
                  width: '400px',
                  height: '400px',
                  top: '18%',
                  left: '42%',
                  backgroundColor: '#262626',
                  color: 'white',
                }
              }}
              >
                <div className='profile-following-modal-header-container'>
                  <span className='profile-following-modal-header-text '>Following</span>
                </div>
                <button onClick={() => setFollowingModalIsOpen(false)} className='profile-following-modal-close-button'>X</button>
                <FollowingModalContent setFollowingModalIsOpen={setFollowingModalIsOpen}/>
             </Modal>
              {following && <div>
                <span onClick={() => setFollowingModalIsOpen(true)} className='profile-count-numbers profile-open-followers'>{Object.keys(following).length} </span>
                <span onClick={() => setFollowingModalIsOpen(true)} className='profile-count-labels profile-open-followers'>following </span>
              </div>}
              </div>
            </div>
        </div>
        <div className='profile-border-container'><div className='profile-border'></div></div>
        <ProfilePosts />
    </div>
  );
}
export default Profile;
