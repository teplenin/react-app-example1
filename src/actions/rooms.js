import {
    FETCH_ROOMS_LIST_REQUEST, FETCH_ROOMS_LIST_SUCCESS,
    FETCH_ROOMS_LIST_FAILURE, UPDATE_ROOMS_ITEM_NAME
} from 'constants/actions';

import { API_URL } from 'constants/api';

const fetchRoomsListRequest = () => {
    return {
        type: FETCH_ROOMS_LIST_REQUEST
    }
}

const fetchRoomsListSuccess = (items) => {
    return {
        type: FETCH_ROOMS_LIST_SUCCESS,
        payload: items
    }
}

const fetchRoomsListFailure = (error) => {
    return {
        type: FETCH_ROOMS_LIST_FAILURE,
        error: true,
        payload: error
    }
}

export const fetchRoomsList = () => {
    return dispatch => {
        dispatch(fetchRoomsListRequest());

        return fetch(`${API_URL}/rooms/`)
            .then(response => response.json())
            .then(response => {
                if(response.status !== 'success' || !response.data) throw(response);

                return response.data;
            })
            .then(data => dispatch(fetchRoomsListSuccess(data)))
            .catch(error => dispatch(fetchRoomsListFailure(error)));
    }
}

export const updateItemName = (roomID, name) => {
    return dispatch => dispatch({
        type: UPDATE_ROOMS_ITEM_NAME,
        payload: name,
        roomID
    })
}
