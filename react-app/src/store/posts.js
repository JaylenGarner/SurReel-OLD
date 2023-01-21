const defaultState = {}

const LOAD_PROFILE_POSTS = 'posts/LOAD_MY_POSTS';
const LOAD_POST = 'posts/LOAD_POST';

const loadProfilePosts = payload => {
    return {
        type: LOAD_PROFILE_POSTS,
        payload
    }
}

export const loadProfilePostsThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/posts`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadProfilePosts(data))
      }
}

const loadPost = payload => {
    return {
        type: LOAD_POST,
        payload
    }
}

export const loadPostThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadPost(data))
      }
}



export default function reducer(state = defaultState, action) {
    const newState = {...state}

    switch (action.type) {
        case LOAD_PROFILE_POSTS:
            return {...action.payload}
        case LOAD_POST:
            return {post: action.payload}
        default:
            return state;
    }
}
