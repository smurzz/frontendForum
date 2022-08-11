import axios from "axios";

export const REQUEST_READ_USERS = 'REQUEST_READ_USERS';
export const SUCCESS_READ_USERS = 'SUCCESS_READ_USERS';
export const FAIL_READ_USERS = 'FAIL_READ_USERS';

export const REQUEST_CREATE_USER = 'REQUEST_CREATE_USER';
export const SUCCESS_CREATE_USER = 'SUCCESS_CREATE_USER';
export const FAIL_CREATE_USER = 'FAIL_CREATE_USER';

export const REQUEST_DELETE_USER = 'REQUEST_DELETE_USER';
export const SUCCESS_DELETE_USER = 'SUCCESS_DELETE_USER';
export const FAIL_DELETE_USER = 'FAIL_DELETE_USER';

export const REQUEST_EDIT_USER = 'REQUEST_EDIT_USER';
export const SUCCESS_EDIT_USER = 'SUCCESS_EDIT_USER';
export const FAIL_EDIT_USER = 'FAIL_EDIT_USER';

export function getUsersPendingAction() {
    return {
        type: REQUEST_READ_USERS
    }
}

export function getUsersSuccessAction(users) {
    return {
        type: SUCCESS_READ_USERS,
        users: users
    }
}

export function getUsersErrorAction(error) {
    return {
        type: FAIL_READ_USERS,
        error: error
    }
}

export function createUserPendingAction() {
    return {
        type: REQUEST_CREATE_USER
    }
}

export function createUserSuccessAction(res) {
    return {
        type: SUCCESS_CREATE_USER,
        status: res.status
    }
}

export function createUserErrorAction(error) {
    return {
        type: FAIL_CREATE_USER,
        status: error
    }
}

export function deleteUserPendingAction() {
    return {
        type: REQUEST_DELETE_USER
    }
}

export function deleteUserSuccessAction(res) {
    return {
        type: SUCCESS_DELETE_USER,
        status: res.status
    }
}

export function deleteUserErrorAction(error) {
    return {
        type: FAIL_DELETE_USER,
        status: error.status
    }
}

export function editUserPendingAction() {
    return {
        type: REQUEST_EDIT_USER
    }
}

export function editUserSuccessAction(res) {
    return {
        type: SUCCESS_EDIT_USER,
        status: res.status
    }
}

export function editUserErrorAction(error) {
    return {
        type: FAIL_EDIT_USER,
        status: error.status
    }
}

export function getUsers() {
    return dispatch => {
        dispatch(getUsersPendingAction());
        const requestOptions = {
            headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userSession')).accessToken }
        };
        axios.get('/users', requestOptions)
            .then(response => {
                const users = response.data;
                dispatch(getUsersSuccessAction(users))
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(getUsersErrorAction(errorMessage));
            })
    }
}

export function createUser(user) {
    return dispatch => {
        dispatch(createUserPendingAction());
        const requestOptions = {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userSession')).accessToken}
        };
        axios.post('/users', user, requestOptions)
            .then(response => {
                dispatch(createUserSuccessAction(response))
            })
            .catch(error => {
                dispatch(createUserErrorAction(error.message));
            })
    }
}

export function deleteUser(userID) {
    return dispatch => {
        dispatch(deleteUserPendingAction());
        const requestOptions = {
            headers: { 
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userSession')).accessToken}
        };
        axios.delete('/users/' + userID, requestOptions)
            .then(response => {
                dispatch(deleteUserSuccessAction(response))
            })
            .catch(error => {
                dispatch(deleteUserErrorAction(error.message));
            })
    }
}

export function editUser(userID, user) {
    return dispatch => {
        console.log(user);
        dispatch(editUserPendingAction());
        const requestOptions = {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userSession')).accessToken}
        };
        axios.put('/users/' + userID, user, requestOptions)
            .then(response => {
                dispatch(editUserSuccessAction(response))
            })
            .catch(error => {
                dispatch(editUserErrorAction(error.message));
            })
    }
}