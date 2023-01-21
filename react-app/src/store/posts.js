const defaultState = {}

const LOAD_PROFILE_POSTS = 'servers/LOAD_MY_POSTS';

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

export default function reducer(state = defaultState, action) {
    const newState = {...state}

    switch (action.type) {
        case LOAD_PROFILE_POSTS:
            return {...newState, ...action.payload}
        default:
            return state;
    }
}
