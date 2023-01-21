import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProfilePostsThunk } from '../../../store/posts';
import { useParams } from 'react-router-dom';
import './ProfilePosts.css';

function ProfilePosts() {
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.session.user)
    const posts = Object.values(useSelector((state) => state.posts))
    const { userId } = useParams()


    useEffect(() => {
       dispatch(loadProfilePostsThunk(userId));
    }, [dispatch]);

    if (!posts) {
      return null;
    } else {
      return (
        <div className='user-profile-container'>
          <div className='profile-posts-grid-container'>
            {posts && posts.map((post) => {
              return (
              <div key={post.id} className='profile-post-container'>
                <img src={post.media} className='profile-post-media'></img>
              </div>
              )
            })}
          </div>
        </div>
        );
      }
    }

export default ProfilePosts;
