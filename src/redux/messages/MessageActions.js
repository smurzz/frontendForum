import axios from "axios";

export const REQUEST_READ_MESSAGES = 'REQUEST_READ_MESSAGES';
export const SUCCESS_READ_MESSAGES = 'SUCCESS_READ_MESSAGES';
export const FAIL_READ_MESSAGES = 'FAIL_READ_MESSAGES';

export const REQUEST_CREATE_MESSAGE = 'REQUEST_CREATE_MESSAGE';
export const SUCCESS_CREATE_MESSAGE = 'SUCCESS_CREATE_MESSAGE';
export const FAIL_CREATE_MESSAGE = 'FAIL_CREATE_MESSAGE';

export const REQUEST_DELETE_MESSAGE = 'REQUEST_DELETE_MESSAGE';
export const SUCCESS_DELETE_MESSAGE = 'SUCCESS_DELETE_MESSAGE';
export const FAIL_DELETE_MESSAGE = 'FAIL_DELETE_MESSAGE';

export const REQUEST_EDIT_MESSAGE = 'REQUEST_EDIT_MESSAGE';
export const SUCCESS_EDIT_MESSAGE = 'SUCCESS_EDIT_MESSAGE';
export const FAIL_EDIT_MESSAGE = 'FAIL_EDIT_MESSAGE';

export function getMessagesPendingAction() {
    return {
        type: REQUEST_READ_MESSAGES
    }
}

export function getMessagesSuccessAction(messages) {
    return {
        type: SUCCESS_READ_MESSAGES,
        messages: messages
    }
}

export function getMessagesErrorAction(error) {
    return {
        type: FAIL_READ_MESSAGES,
        error: error
    }
}

export function createMessagePendingAction() {
    return {
        type: REQUEST_CREATE_MESSAGE
    }
}

export function createMessageSuccessAction(res) {
    return {
        type: SUCCESS_CREATE_MESSAGE,
        status: res.status
    }
}

export function createMessageErrorAction(error) {
    return {
        type: FAIL_CREATE_MESSAGE,
        status: error
    }
}

export function deleteMessagePendingAction() {
    return {
        type: REQUEST_DELETE_MESSAGE
    }
}

export function deleteMessageSuccessAction(res) {
    return {
        type: SUCCESS_DELETE_MESSAGE,
        status: res.status
    }
}

export function deleteMessageErrorAction(error) {
    return {
        type: FAIL_DELETE_MESSAGE,
        status: error.status
    }
}

export function editMessagePendingAction() {
    return {
        type: REQUEST_EDIT_MESSAGE
    }
}

export function editMessageSuccessAction(res) {
    return {
        type: SUCCESS_EDIT_MESSAGE,
        status: res.status
    }
}

export function editMessageErrorAction(error) {
    return {
        type: FAIL_EDIT_MESSAGE,
        status: error.status
    }
}

export function getMessages(forumID) {
    return dispatch => {
        dispatch(getMessagesPendingAction());
        axios.get('/forumThreads/' + forumID + '/forumMessages')
            .then(response => {
                const messages = response.data;
                const action = getMessagesSuccessAction(messages);
                dispatch(action);
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(getMessagesErrorAction(errorMessage));
            })
    }
}

export function createMessage(message) {
    return dispatch => {
        dispatch(createMessagePendingAction());
        const requestOptions = {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userSession')).accessToken}
        };
        axios.post('/forumMessages', message, requestOptions)
            .then(response => {
                dispatch(createMessageSuccessAction(response))
            })
            .catch(error => {
                dispatch(createMessageErrorAction(error.message));
            })
    }
}

export function deleteMessage(messageID) {
    return dispatch => {
        dispatch(deleteMessagePendingAction());
        const requestOptions = {
            headers: { 
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userSession')).accessToken}
        };
        axios.delete('/forumMessages/' + messageID, requestOptions)
            .then(response => {
                dispatch(deleteMessageSuccessAction(response))
            })
            .catch(error => {
                dispatch(deleteMessageErrorAction(error.message));
            })
    }
}

export function editMessage(messageID, message) {
    return dispatch => {
        dispatch(editMessagePendingAction());
        const requestOptions = {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userSession')).accessToken}
        };
        axios.put('/forumMessages/' + messageID, message, requestOptions)
            .then(response => {
                dispatch(editMessageSuccessAction(response))
            })
            .catch(error => {
                dispatch(editMessageErrorAction(error.message));
            })
    }
}