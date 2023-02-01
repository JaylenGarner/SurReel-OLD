import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { createPostThunk } from '../../store/posts';
// Uses Login Form Styling
import '../auth/LoginForm.css'
import './CreatePostForm.css'

const CreatePostForm = () => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('')
    const [imageLoading, setImageLoading] = useState(false);

    if (!user) {
        history.push('/login')
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("image", image);
        formData.append("caption", caption);
        // const createPost = await dispatch(createPostThunk(formData));

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch('/api/posts/create', {
            method: "POST",
            body: formData
        });

        if (res.ok) {
            await res.json();
            setImageLoading(false);
            history.push(`/users/${user.id}/profile`);
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
    }

    const updateImage = (e) => {
        setImage(e.target.files[0]);
    }

    const updateCaption = (e) => {
        setCaption(e.target.value);
    }

    return (
        <div className='login-page-container'>
         <div className='login-form-page-container' >
         <h1 style={{"margin-bottom": "30px", "fontSize": "40px", "fontFamily": "cursive"}}>Create a Post</h1>
        <form onSubmit={handleSubmit}>
        <div className='login-form-input-area'>
            <input
              type="file"
              name='image'
              accept="image/*"
              onChange={updateImage}
              required
            />
            </div>
            <div className='login-form-input-area'>
            <input
              name='caption'
              type="text"
              onChange={updateCaption}
              value={caption}
              placeholder='Create a caption'
            />
            </div>
            <button type="submit" className='login-button'>Create Post</button>
            {(imageLoading)&& <p>Loading...</p>}
        </form>
            </div>
            </div>
    )
}

export default CreatePostForm;
