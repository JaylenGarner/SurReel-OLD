const defaultState = {}

const LOAD_MESSAGE_SERVERS = 'messages/LOAD_MESSAGE_SERVERS';
const LOAD_ONE_MESSAGE_SERVER = 'messages/LOAD_ONE_MESSAGE_SERVER';
const CREATE_MESSAGE_SERVER = 'messages/CREATE_MESSAGE_SERVER'
const LEAVE_MESSAGE_SERVER = 'messages/LEAVE_MESSAGE_SERVER'

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

const createMessageServer = payload => {
    return {
        type: CREATE_MESSAGE_SERVER,
        payload
    }
}

export const createMessageServerThunk = (members) => async (dispatch) => {
        const res = await fetch(`/api/message-servers/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "members": members
            }),
        });

        if (res.ok) {
            const newData = await res.json()
            dispatch(createMessageServer(newData))
            return res
        } else {
            return res
        }
    }

    const leaveMessageServer = (serverId) => {
        return {
            type: LEAVE_MESSAGE_SERVER,
            serverId
        }
    }

    export const leaveMessageServerThunk = (serverId) => async (dispatch) => {
        const leave = await fetch(`/api/message-servers/${serverId}/leave`, {
            method: "DELETE"
        })

        if (leave.ok) dispatch(leaveMessageServer(serverId))
        return leave
    }

export default function reducer(state = defaultState, action) {
    const newState = {...state}
    if (!action || !action.type) return state;
    switch (action.type) {
        case LOAD_MESSAGE_SERVERS:
            return {...newState, messageServers: action.payload}
        case LOAD_ONE_MESSAGE_SERVER:
            return {...newState, currMessageServer: action.payload}
        case CREATE_MESSAGE_SERVER:
            return {...newState, currMessageServer: action.payload}
        case LEAVE_MESSAGE_SERVER:
            delete newState.messageServers[action.serverId]
            return newState
        default:
            return state;
    }
}
