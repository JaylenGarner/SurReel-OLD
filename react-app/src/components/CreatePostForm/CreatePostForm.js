import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// Uses Login Form Styling
import '../auth/LoginForm.css'
import './CreatePostForm.css'

const CreatePostForm = () => {
  const history = useHistory(); // so that we can redirect after the image upload is successful
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  if (!user) {
    history.push('/login');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);

    const res = await fetch('/api/posts/create', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      await res.json();
      setImageLoading(false);
      history.push(`/users/${user.id}/profile`);
    } else {
      setImageLoading(false);
      // a real app would probably use more advanced
      // error handling
      console.log('error');
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  return (
    <div className="create-a-post-form-container">
      <div className="login-page-container">
        <div className="login-form-page-container">
          <h1 style={{ marginBottom: '30px', fontSize: '40px', fontFamily: 'cursive' }}>Create a Post</h1>
          <form onSubmit={handleSubmit}>
            <div className="login-form-input-area">
            <input
            type="file"
            name="image"
            accept=".pdf, .png, .jpg, .jpeg, .gif"
            onChange={handleImageChange} required
            className='post-file-input'
            />
            </div>
            <div className="login-form-input-area">
              <input
                name="caption"
                type="text"
                onChange={handleCaptionChange}
                value={caption}
                placeholder="Create a caption"
              />
            </div>
            <div className='post-submission-area'>
            <button type="submit" className="login-button">
              Create Post
            </button>
            {imagePreview && !imageLoading && <img src={imagePreview} alt="Selected image preview" className='create-post-preview-image'/>}
            </div>
            {imageLoading && (
              <div className="aws-loading-container">
                <div class="aws-loading">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;
