const defaultState = {}

const LOAD_LIKES = 'likes/LOAD_LIKES';
const LIKE_POST = 'likes/LIKE_POST';
const UNLIKE_POST = 'likes/UNLIKE_POST'

const loadLikes = payload => {
    return {
        type: LOAD_LIKES,
        payload
    }
}

export const loadLikesThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}/likes`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadLikes(data))
      }
}

const likePost = payload => {
    return {
        type: LIKE_POST,
        payload
    }
}

export const likePostThunk = (postId) => async (dispatch) => {

    const res = await fetch(`/api/posts/${postId}/like`)

      if (res.ok) {
        const newData = await res.json()
        dispatch(likePost(newData))
    }
}

const unlikePost = (payload) => {
    return {
        type: UNLIKE_POST,
        payload
    }
}

export const unlikePostThunk = (postId) => async (dispatch) => {
    const unlike = await fetch(`/api/posts/${postId}/unlike`, {
        method: "DELETE"
    })

    if (unlike.ok) dispatch(unlikePost(postId))
}

export default function reducer(state = defaultState, action) {
    const newState = {...state}

    switch (action.type) {
        case LOAD_LIKES:
            return {...action.payload}
        case LIKE_POST:
            return {...action.payload}
        case UNLIKE_POST:
            return {...newState}
        default:
            return state;
    }
}
