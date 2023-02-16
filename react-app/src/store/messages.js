const defaultState = {}

const LOAD_MESSAGES = 'messages/LOAD_MESSAGES'
const CLEAR_MESSAGES = 'messages/CLEAR_MESSAGES'
const CREATE_MESSAGE = 'messages/CREATE_MESSAGE'
const EDIT_MESSAGE = 'messages/EDIT_MESSAGE'
const DELETE_MESSAGE = 'messages/DELETE_MESSAGE'

const loadMessages = payload => {
    return {
        type: LOAD_MESSAGES,
        payload
    }
}

export const loadMessagesThunk = (roomId) => async (dispatch) => {
    // TO CHANGE
    const res = await fetch(`/api/message-servers/${roomId}/messages`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadMessages(data))
      }
}

export const clearMessages = payload => {
    return {
        type: CLEAR_MESSAGES,
        payload
    }
}


    export const createMessage = payload => {
        return {
            type: CREATE_MESSAGE,
            payload
        }
    }

    export const createMessageThunk = (serverId, body) => async (dispatch) => {
            const res = await fetch(`/api/message-servers/${serverId}/message`, {
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
                dispatch(createMessage(newData))
                return res
            } else {
                return res
            }
        }

        const editMessage = payload => {
            return {
                type: EDIT_MESSAGE,
                payload
            }
        }

        export const editMessageThunk = (messageId, body) => async (dispatch) => {
                const res = await fetch(`/api/messages/${messageId}/edit`, {
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
                    dispatch(editMessage(newData))
                    return res
                } else {
                    return res
                }
            }


    const deleteMessage = (messageId) => {
        return {
            type: DELETE_MESSAGE,
            messageId
        }
    }

    export const deleteMessageThunk = (messageId) => async (dispatch) => {
        const deletion = await fetch(`/api/messages/${messageId}/delete`, {
            method: "DELETE"
        })

        if (deletion.ok) dispatch(deleteMessage(messageId))
        return deletion
    }

export default function reducer(state = defaultState, action) {
    const newState = {...state}
    if (!action || !action.type) return state;
    switch (action.type) {
        case LOAD_MESSAGES:
            return {...action.payload}
        case CLEAR_MESSAGES:
            return {}
        case CREATE_MESSAGE:
            return {...newState, [action.payload.id] : action.payload}
        case EDIT_MESSAGE:
            return {...newState}
        case DELETE_MESSAGE:
            delete newState[action.messageId]
            return newState
        // case DELETE_ROOM:
        //     delete newState[action.serverId]
        //     return newState
        default:
            return state;
    }
}
