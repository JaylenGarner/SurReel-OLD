import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { loadCommentsThunk } from '../../../store/comments';

import './PostPageComments.css'

function PostPageComments() {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const user = useSelector((state) => state.session.user)
    const comments = useSelector((state) => state.comments)

    if (!comments) {
        return <></>
    } else {

        return (
            <div className='post-page-comment-feed-container'>
                {Object.values(comments).map((comment) => {
                    if (comment.post_id == postId) {
                        return (
                            <div className='post-page-comment-container'>
                                <NavLink to={`/users/${comment.user.id}/profile`}>
                                    <img src={comment.user.image} className='post-page-user-image'></img>
                                </NavLink>
                                <NavLink to={`/users/${comment.user.id}/profile`} className='post-page-owner-username'>{comment.user.username}</NavLink>
                                <span className='post-page-caption'>{comment.body}</span>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }
}

export default PostPageComments;
