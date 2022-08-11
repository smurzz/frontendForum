import jwt_decode from "jwt-decode";
import axios from "axios";

export const SHOW_LOGIN_DIALOG = 'SHOW_LOGIN_DIALOG';
export const HIDE_LOGIN_DIALOG = 'HIDE_LOGIN_DIALOG';

export const AUTHENTICATION_PENDING = 'AUTHENTICATION_PENDING';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

export const SING_UP_PENDING = 'SING_UP_PENDING';
export const SING_UP_SUCCESS = 'SING_UP_SUCCESS';
export const SING_UP_ERROR = 'SING_UP_ERROR';

export const LOG_OUT = 'LOG_OUT';

export function getShowLoginDialogAction() {
    return {
        type: SHOW_LOGIN_DIALOG
    }
}

export function getHideLoginDialogAction() {
    return {
        type: HIDE_LOGIN_DIALOG
    }
}

export function getAuthenticateUserPendingAction() {
    return {
        type: AUTHENTICATION_PENDING
    }
}

export function getAuthenticationSuccessAction(userSession) {
    return {
        type: AUTHENTICATION_SUCCESS,
        user: userSession.user,
        accessToken: userSession.accessToken
    }
}

export function getAuthenticationErrorAction(error) {
    return {
        type: AUTHENTICATION_ERROR,
        error: error
    }
}

export function getLogOutAction(userSession) {
    return {
        type: LOG_OUT,
        user: userSession.user,
        accessToken: userSession.accessToken
    }
}

export function signupePendingAction() {
    return {
        type: SING_UP_PENDING
    }
}

export function signupSuccessAction(res) {
    return {
        type: SING_UP_SUCCESS,
        status: res.status
    }
}

export function signupErrorAction(error) {
    return {
        type: SING_UP_ERROR,
        error: error
    }
}

export function logoutUser() {
    console.log('Logout');
    const userSession =  logout();

    return dispatch => {
        const action = getLogOutAction(userSession);
        dispatch(action);
    }
}

export function authenticateUser(userID, password) {
    console.log('Authenticate');
   
    return dispatch => {

        dispatch(getAuthenticateUserPendingAction());
        login(userID, password)
            .then(
                userSession => {
                    const action = getAuthenticationSuccessAction(userSession);
                    dispatch(action);
                },
                error => {
                    dispatch(getAuthenticationErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getAuthenticationErrorAction(error));
            })
    }
}

export function signupUser(user) {
    return dispatch => {
        dispatch(signupePendingAction());
        const requestOptions = {
            headers: { 
                'Content-Type': 'application/json'
            }
        };
        axios.post('/authenticate/signup', user, requestOptions)
            .then(response => {
                dispatch(signupSuccessAction(response))
            })
            .catch(error => {
                console.log("Fehler: " + error.message);
                dispatch(signupErrorAction(error));
            })
        
    }
}

function login(userID, password) {
    
    const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': 'Basic ' + btoa(`${userID}:${password}`) }
    };

    return fetch('https://localhost:443/authenticate', requestOptions)
        .then(response => {
            const autherizationHeader = response.headers.get('Authorization');

            return response.text().then(text => {
                console.log('Receive result: ' + autherizationHeader);

                const data = text && JSON.parse(text);
                var token;
                if (autherizationHeader) {
                    token = autherizationHeader.split(' ')[1];
                }

                if (!response.ok) {
                    if (response.status === 401) {
                        logout();
                    }
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                } else {
                    var userData = jwt_decode(token);
                    var userSession = {
                        user: userData,
                        accessToken: token
                    }
                    localStorage.setItem('userSession', JSON.stringify(userSession));
                    return userSession;
                }
            })
        })
        .then(userSession => {
            return userSession;
        });
}

function logout() {
    console.error('Logout user');
    localStorage.clear(); 
    var userSession = {
        user: null,
        accessToken: null
    }
    return userSession;
}
