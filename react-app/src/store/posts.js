const defaultState = {}

const LOAD_PROFILE_POSTS = 'posts/LOAD_MY_POSTS';
const LOAD_POST = 'posts/LOAD_POST';
const EDIT_POST = 'posts/EDIT_POST';
const DELETE_POST = 'posts/DELETE_POST'

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

const editPost = payload => {
    return {
        type: EDIT_POST,
        payload
    }
}

export const editPostThunk = (postId, caption) => async (dispatch) => {

    const res = await fetch(`/api/posts/${postId}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caption
        }),
      });

      if (res.ok) {
        const newData = await res.json()
        dispatch(editPost(newData))
    }
}

const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}

export const deletePostThunk = (postId) => async (dispatch) => {
    const post = await fetch(`/api/posts/${postId}/delete`, {
        method: "DELETE"
    })

    if (post.ok) dispatch(deletePost(postId))
}

export default function reducer(state = defaultState, action) {
    const newState = {...state}

    switch (action.type) {
        case LOAD_PROFILE_POSTS:
            return {...action.payload}
        case LOAD_POST:
            return {post: action.payload}
        case EDIT_POST:
            return {post: action.payload}
        case DELETE_POST:
            return null;
        default:
            return state;
    }
}
