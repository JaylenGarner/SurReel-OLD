import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadFeedPostsThunk } from '../../store/posts';
import './HomeFeed.css'


function HomeFeed() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const posts = useSelector((state) => state.posts)
// const posts = []


  useEffect(() => {
    dispatch(loadFeedPostsThunk(user.id));
  }, [dispatch]);

  if (!user) {
    return null;
  }

  if (!Object.values(posts).length) {
    return <h1>There are no posts in your feed. Get started by following other users</h1>
  } else {
      return (
       <div className='home-page-feed-container'>
        {posts && Object.values(posts).map((post) => {
            return <div key={post.id} className='home-feed-post-container'>
                <div className='home-feed-post-owner-info-container'>
                <img src={post.owner.image} className='home-feed-post-owner-image'></img>
                <span className='home-feed-post-owner-username'>{post.owner.username}</span>
                </div>
                <img src={post.media} className='home-feed-post-image'></img>
                <div className='home-feed-post-interaction-area'>

                <span>{post.caption}</span>
                </div>
            </div>
        })}
        <div className='home-page-info-area'>User info area / suggested users</div>
       </div>
      );
  }

}
export default HomeFeed;
