const defaultState = {}

const LOAD_MESSAGE_SERVERS = 'messages/LOAD_MESSAGE_SERVERS';
const LOAD_ONE_MESSAGE_SERVER = 'messages/LOAD_ONE_MESSAGE_SERVER';

const loadMessageServers = payload => {
    return {
        type: LOAD_MESSAGE_SERVERS,
        payload
    }
}

export const loadMessageServersThunk = () => async (dispatch) => {
    const res = await fetch(`/api/message-servers`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadMessageServers(data))
      }
}


const loadOneMessageServer = payload => {
    return {
        type: LOAD_ONE_MESSAGE_SERVER,
        payload
    }
}

export const loadOneMessageServerThunk = (messageServerId) => async (dispatch) => {
    const res = await fetch(`/api/message-servers/${messageServerId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadOneMessageServer(data))
      }
}

export default function reducer(state = defaultState, action) {
    const newState = {...state}

    switch (action.type) {
        case LOAD_MESSAGE_SERVERS:
            return {...newState, messageServers: action.payload}
        case LOAD_ONE_MESSAGE_SERVER:
            return {...newState, currMessageServer: action.payload}
        // case CREATE_POST:
        //     return {post: action.payload}
        // case EDIT_POST:
        //     return {post: action.payload}
        // case DELETE_POST:
        //     return {post: 'deleted'};
        default:
            return state;
    }
}
