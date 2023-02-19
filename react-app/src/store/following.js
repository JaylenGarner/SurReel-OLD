const defaultState = {}

const LOAD_FOLLOWING = 'follows/LOAD_FOLLOWING'
const FOLLOW_USER = 'follows/FOLLOW_USER';
const UNFOLLOW_USER = 'follows/UNFOLLOW_USER'

const loadFollowing = payload => {
    return {
        type: LOAD_FOLLOWING,
        payload
    }
}

export const loadFollowingThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/following`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadFollowing(data))
      }
}

const followUser = payload => {
    return {
        type: FOLLOW_USER,
        payload
    }
}

export const followUserThunk = (targetId) => async (dispatch) => {

    const res = await fetch(`/api/users/follow/${targetId}`)

      if (res.ok) {
        const newData = await res.json()
        dispatch(followUser(newData))
    }
}

const unfollowUser = (payload) => {
    return {
        type: UNFOLLOW_USER,
        payload
    }
}

export const unfollowUserThunk = (targetId) => async (dispatch) => {
    const unfollow = await fetch(`/api/users/unfollow/${targetId}`, {
        method: "DELETE"
    })

    if (unfollow.ok) dispatch(unfollowUser(targetId))
}

export default function reducer(state = defaultState, action) {
    const newState = {...state}

    switch (action.type) {
        case LOAD_FOLLOWING:
            return {...newState, ...action.payload}
        case FOLLOW_USER:
            return {...newState, [action.payload.id]: action.payload}
        case UNFOLLOW_USER:
            delete newState[action.payload]
            return {...newState}
        default:
            return state;
    }
}
