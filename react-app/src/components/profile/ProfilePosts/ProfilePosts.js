import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProfilePostsThunk } from '../../../store/posts';
import { NavLink, useParams } from 'react-router-dom';
import './ProfilePosts.css';

function ProfilePosts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts)

  const { userId } = useParams()

  useEffect(() => {
    dispatch(loadProfilePostsThunk(userId));
  }, [dispatch]);

  const filterPosts = () => {

    if (posts && Object.values(posts).length) {

      const values = Object.values(posts);

      const filteredPosts = values.filter((post) => {
        return post.owner_id == userId
      });

      return filteredPosts;

    } else {
      return [];
    }
  }

    if (!Object.values(posts).length) {
      return <h1 className='profile-user-has-not-posted'>This user has not posted yet</h1>
    } else {
      const filteredPosts = filterPosts()
      return (
        <div className='user-profile-container'>
          <div className='profile-posts-grid-container'>
            {posts &&  filteredPosts.map((post) => {
              return (
              <div key={post.id} className='profile-post-container'>
                <NavLink to={`/posts/${post.id}`}>
                <img src={post.media} className='profile-post-media'></img>
                </NavLink>
              </div>
              )
            })}
          </div>
        </div>
        );
      }
    }

export default ProfilePosts;
