const defaultState = {}

const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';
const CREATE_COMMENT = 'comments/CREATE_COMMENT'
const EDIT_COMMENT = 'comments/EDIT_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT'

const loadComments = payload => {
    return {
        type: LOAD_COMMENTS,
        payload
    }
}

export const loadCommentsThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}/comments`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadComments(data))
      }
}

const createCommenet = payload => {
    return {
        type: CREATE_COMMENT,
        payload
    }
}

export const createCommentThunk = (postId, body) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}/comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            body
        }),
    });

    if (res.ok) {
        const newData = await res.json()
        dispatch(createCommenet(newData))
        return res
    } else {
        return res
    }
}

const editComment = payload => {
    return {
        type: EDIT_COMMENT,
        payload
    }
}

export const editCommentThunk = (commentId, body) => async (dispatch) => {

    const res = await fetch(`/api/comments/${commentId}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body
        }),
      });

      if (res.ok) {
        const newData = await res.json()
        dispatch(editComment(newData))
    }
}

const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}/delete`, {
        method: "DELETE"
    })

    if (res.ok) dispatch(deleteComment(commentId))
}

export default function reducer(state = defaultState, action) {
    const newState = {...state}

    switch (action.type) {
        case LOAD_COMMENTS:
            return {...newState, ...action.payload}
        case CREATE_COMMENT:
            return {...newState, [action.payload.id] : action.payload}
        case EDIT_COMMENT:
            return {...newState, [action.payload.id] : action.payload}
        case DELETE_COMMENT:
            delete newState[action.commentId]
            return newState
        default:
            return state;
    }
}
