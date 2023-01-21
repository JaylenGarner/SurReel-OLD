import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { loadPostThunk } from '../store/posts';
import './PostPage.css';

function PostPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const post = useSelector((state) => state.posts.post)
  const { postId } = useParams()


  useEffect(() => {
     dispatch(loadPostThunk(postId));
  }, [dispatch]);

  if (!post) {
    return null;
  }

  return (
    <div className='post-page-grid'>
      <img className='post-page-image' src={post.media}></img>
      <div className='post-page-content'>
        <div className='post-page-owner-info'>
          <NavLink to={`/users/${post.owner.id}/profile`}>
            <img src={post.owner.image} className='post-page-user-image'></img>
          </NavLink>
          <NavLink to={`/users/${post.owner.id}/profile`}>
          <span className='post-page-owner-username'>{post.owner.username}</span>
          </NavLink>
        </div>
        <div className='post-page-caption-area'>
          <img src={post.owner.image} className='post-page-user-image'></img>
          <NavLink to={`/users/${post.owner.id}/profile`}>
          <span className='post-page-owner-username'>{post.owner.username}</span>
          </NavLink>
          <span className='post-page-caption'>{post.caption}</span>
        </div>
      </div>
    </div>
  );
}
export default PostPage;
