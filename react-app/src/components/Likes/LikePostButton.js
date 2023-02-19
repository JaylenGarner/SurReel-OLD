import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartO } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartFilled } from '@fortawesome/free-solid-svg-icons';
import './LikePostButton.css'


const LikePostButton = ({postId}) => {

  return (
    <button className="like-button">
        {/* liked ? faHeartFilled : faHeartO} */}
      <FontAwesomeIcon icon={faHeartFilled} />
    </button>
  );
};

export default LikePostButton;
