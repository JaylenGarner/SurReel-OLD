import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadFeedPostsThunk } from '../../store/posts';


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
       <div>
        {posts && Object.values(posts).map((post) => {
            return <div key={post.id}>
                <img src={post.media}></img>
                <span>{post.caption}</span>
            </div>
        })}
       </div>
      );
  }

}
export default HomeFeed;
