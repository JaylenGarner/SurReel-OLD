import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { createPostThunk } from '../../store/posts';

const CreatePostForm = () => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('')
    const [imageLoading, setImageLoading] = useState(false);


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
            // history.push("/images");
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
        <form onSubmit={handleSubmit}>
            <span>Upload Image</span>
            <input
              type="file"
              name='image'
              accept="image/*"
              onChange={updateImage}
              required
            />
            <span>Set a caption</span>
            <input
              name='caption'
              type="text"
              onChange={updateCaption}
              value={caption}
              required
            />
            <button type="submit">Submit</button>
            {(imageLoading)&& <p>Loading...</p>}
        </form>
    )
}

export default CreatePostForm;
