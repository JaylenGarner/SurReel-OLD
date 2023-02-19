const defaultState = {}

const LOAD_MESSAGES = 'messages/LOAD_MESSAGES'
const CREATE_MESSAGE = 'messages/CREATE_MESSAGE'

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


        export default function reducer(state = defaultState, action) {
            switch (action.type) {
                case LOAD_MESSAGES:
                    return {...state, ...action.payload};
                case CREATE_MESSAGE:
                    const messageId = action.payload.id;
                    return {...state, [messageId]: action.payload};
                default:
                    return state;
            }
        }
