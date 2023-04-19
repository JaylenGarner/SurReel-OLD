import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import CommentOptions from '../CommentOptions/CommentOptions';
import { deleteCommentThunk } from '../../../store/comments';
import Modal from 'react-modal';

import './PostPageComments.css';

function PostPageComments() {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const user = useSelector((state) => state.session.user);
    const comments = useSelector((state) => state.comments);

    const [modalIsOpen, setmodalIsOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);

    const openModal = (comment) => {
        setSelectedComment(comment);
        setmodalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedComment(null);
        setmodalIsOpen(false);
    };

    const handleDelete = async (e) => {
        e.preventDefault()
        const data = await dispatch(deleteCommentThunk(selectedComment.id))
        const close = await closeModal()
      };

    if (!comments) {
        return <></>;
    } else {
        return (
            <div className='post-page-comment-feed-container'>
                {Object.values(comments).map((comment) => {
                    if (comment.post_id == postId) {
                        return (
                            <div key={comment.id} className='primary-comment-container fade-in'>
                                <div className='post-page-comment-container'>
                                    <NavLink to={`/users/${comment.user.id}/profile`}>
                                        <img src={comment.user.image} className='post-page-user-image'></img>
                                    </NavLink>
                                    <NavLink to={`/users/${comment.user.id}/profile`} className='post-page-owner-username'>{comment.user.username}</NavLink>
                                    <span className='post-page-caption'>{comment.body}</span>
                                </div>
                                {comment.user.id == user.id &&
                                <button className="dropdown-button" onClick={() => openModal(comment)}>•••</button>
                                }
                            </div>
                        );

                    }
                })}

                {selectedComment && (
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={{
                            content: {
                              width: '400px',
                              height: '250px',
                              top: '25%',
                              left: '40%',
                              marginRight: '-50%',
                              backgroundColor: '#113253',
                              color: 'white',
                            }
                        }}
                    >
                        <CommentOptions currentComment={selectedComment} closeModal={closeModal}/>
                        <div className='delete-comment-button-container fade-in'>
                        <button onClick={handleDelete} className='delete-comment-button'>Delete Comment</button>
                        </div>
                    </Modal>
                )}
            </div>
        );
    }
}

export default PostPageComments;
