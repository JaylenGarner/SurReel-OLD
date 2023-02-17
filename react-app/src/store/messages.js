const defaultState = {}

const LOAD_MESSAGES = 'messages/LOAD_MESSAGES'
const CLEAR_MESSAGES = 'messages/CLEAR_MESSAGES'
const CREATE_MESSAGE = 'messages/CREATE_MESSAGE'
const EDIT_MESSAGE = 'messages/EDIT_MESSAGE'
const DELETE_MESSAGE = 'messages/DELETE_MESSAGE'

const loadMessages = (payload, roomId) => {
    return {
        type: LOAD_MESSAGES,
        payload,
        roomId
    }
}

export const loadMessagesThunk = (roomId) => async (dispatch) => {
    // TO CHANGE
    const res = await fetch(`/api/message-servers/${roomId}/messages`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadMessages(data, roomId))
      }
}

export const clearMessages = payload => {
    return {
        type: CLEAR_MESSAGES,
        payload
    }
}


    export const createMessage = (payload, roomId) => {
        return {
            type: CREATE_MESSAGE,
            payload,
            roomId
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
                dispatch(createMessage(newData, serverId))
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
            return {...newState, [action.roomId] : action.payload}
        case CLEAR_MESSAGES:
            return {}
        case CREATE_MESSAGE:
            const room = newState[action.roomId];
            const messageId = action.payload.id;
            return {
                ...newState,
                [action.roomId]: {
                    ...room,
                    [messageId]: action.payload,
                },
            };
        case EDIT_MESSAGE:
            return {...newState}
            case DELETE_MESSAGE:
                const roomId = Object.keys(newState).find(key => newState[key][action.messageId]);
                if (roomId) {
                  const room = newState[roomId];
                  const updatedRoom = Object.keys(room)
                    .filter(messageId => messageId !== action.messageId)
                    .reduce((obj, key) => {
                      obj[key] = room[key];
                      return obj;
                    }, {});
                  return {
                    ...newState,
                    [roomId]: updatedRoom,
                  };
                } else {
                  return newState;
                }
        default:
            return state;
    }
}
