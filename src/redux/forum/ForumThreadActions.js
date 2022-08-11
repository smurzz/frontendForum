import axios from "axios";

export const REQUEST_READ_FORUMS = 'REQUEST_READ_FORUMS';
export const SUCCESS_READ_FORUMS = 'SUCCESS_READ_FORUMS';
export const FAIL_READ_FORUMS = 'FAIL_READ_FORUMS';

export const REQUEST_CREATE_FORUM = 'REQUEST_CREATE_FORUM';
export const SUCCESS_CREATE_FORUM = 'SUCCESS_CREATE_FORUM';
export const FAIL_CREATE_FORUM = 'FAIL_CREATE_FORUM';

export const REQUEST_DELETE_FORUM = 'REQUEST_DELETE_FORUM';
export const SUCCESS_DELETE_FORUM = 'SUCCESS_DELETE_FORUM';
export const FAIL_DELETE_FORUM = 'FAIL_DELETE_FORUM';

export const REQUEST_EDIT_FORUM = 'REQUEST_EDIT_FORUM';
export const SUCCESS_EDIT_FORUM = 'SUCCESS_EDIT_FORUM';
export const FAIL_EDIT_FORUM = 'FAIL_EDIT_FORUM';

export function getForumsPendingAction() {
    return {
        type: REQUEST_READ_FORUMS
    }
}

export function getForumsSuccessAction(forums) {
    return {
        type: SUCCESS_READ_FORUMS,
        forums: forums
    }
}

export function getForumsErrorAction(error) {
    return {
        type: FAIL_READ_FORUMS,
        error: error
    }
}

export function createForumPendingAction() {
    return {
        type: REQUEST_CREATE_FORUM
    }
}

export function createForumSuccessAction(res) {
    return {
        type: SUCCESS_CREATE_FORUM,
        status: res.status
    }
}

export function createForumErrorAction(error) {
    return {
        type: FAIL_CREATE_FORUM,
        status: error
    }
}

export function deleteForumPendingAction() {
    return {
        type: REQUEST_DELETE_FORUM
    }
}

export function deleteForumSuccessAction(res) {
    return {
        type: SUCCESS_DELETE_FORUM,
        status: res.status
    }
}

export function deleteForumErrorAction(error) {
    return {
        type: FAIL_DELETE_FORUM,
        status: error.status
    }
}

export function editForumPendingAction() {
    return {
        type: REQUEST_EDIT_FORUM
    }
}

export function editForumSuccessAction(res) {
    return {
        type: SUCCESS_EDIT_FORUM,
        status: res.status
    }
}

export function editForumErrorAction(error) {
    return {
        type: FAIL_EDIT_FORUM,
        status: error.status
    }
}

export function getForums() {
    return dispatch => {
        dispatch(getForumsPendingAction());
        const requestOptions = {
            headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userSession')).accessToken }
        };
        axios.get('/forumThreads', requestOptions)
            .then(response => {
                const forums = response.data;
                const action = getForumsSuccessAction(forums);
                dispatch(action);
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(getForumsErrorAction(errorMessage));
            })
    }
}

export function createForum(forum) {
    return dispatch => {
        dispatch(createForumPendingAction());
        const requestOptions = {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userSession')).accessToken}
        };
        axios.post('/forumThreads', forum, requestOptions)
            .then(response => {
                const action = createForumSuccessAction(response);
                dispatch(action);
            })
            .catch(error => {
                dispatch(createForumErrorAction(error.message));
            })
    }
}

export function deleteForum(forumID) {
    return dispatch => {
        dispatch(deleteForumPendingAction());
        const requestOptions = {
            headers: { 
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userSession')).accessToken}
        };
        axios.delete('/forumThreads/' + forumID, requestOptions)
            .then(response => {
                dispatch(deleteForumSuccessAction(response))
            })
            .catch(error => {
                dispatch(deleteForumErrorAction(error.message));
            })
    }
}

export function editForum(forumID, forum) {
    return dispatch => {
        dispatch(editForumPendingAction());
        const requestOptions = {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userSession')).accessToken}
        };
        axios.put('/forumThreads/' + forumID, forum, requestOptions)
            .then(response => {
                const action = editForumSuccessAction(response);
                dispatch(action);
            })
            .catch(error => {
                dispatch(editForumErrorAction(error.message));
            })
    }
}