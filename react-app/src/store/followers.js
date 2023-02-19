const defaultState = {}

const LOAD_FOLLOWERS = 'follows/LOAD_FOLLOWERS';

const loadFollowers = payload => {
    return {
        type: LOAD_FOLLOWERS,
        payload
    }
}

export const loadFollowersThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/followers`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadFollowers(data))
      }
}

export default function reducer(state = defaultState, action) {
    const newState = {...state}

    switch (action.type) {
        case LOAD_FOLLOWERS:
            return {...state, ...action.payload}
        default:
            return state;
    }
}
