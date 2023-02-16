const defaultState = {}

const LOAD_ROOMS = 'rooms/LOAD_ROOMS';
const CREATE_ROOM = 'rooms/CREATE_ROOM'
const DELETE_ROOM = 'messages/DELETE_ROOM'


const loadRooms = payload => {
    return {
        type: LOAD_ROOMS,
        payload
    }
}

export const loadRoomsThunk = () => async (dispatch) => {
    const res = await fetch(`/api/message-servers`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadRooms(data))
      }
}

const createRoom = payload => {
    return {
        type: CREATE_ROOM,
        payload
    }
}

export const createRoomThunk = (members) => async (dispatch) => {
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
            dispatch(createRoom(newData))
            return res
        } else {
            return res
        }
    }

    const deleteRoom = (serverId) => {
        return {
            type: DELETE_ROOM,
            serverId
        }
    }

    export const deleteRoomThunk = (serverId) => async (dispatch) => {
        const leave = await fetch(`/api/message-servers/${serverId}/delete`, {
            method: "DELETE"
        })

        if (leave.ok) dispatch(deleteRoom(serverId))
        return leave
    }


export default function reducer(state = defaultState, action) {
    const newState = {...state}
    if (!action || !action.type) return state;
    switch (action.type) {
        case LOAD_ROOMS:
            return {...newState, ...action.payload}
        case CREATE_ROOM:
            return {...newState, [action.payload.id]: action.payload}
        case DELETE_ROOM:
            delete newState[action.serverId]
            return newState
        default:
            return state;
    }
}
