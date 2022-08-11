import * as authenticationActions from '../authentication/AuthenticationActions';

const initialState = {
    user: null,
    loginPending: false,
    showLoginDialog: false,
    error: null,
    status: ''
};

export default function authenticationReducer(state = initialState, action) {

    console.log('Bin in Reducer: ' + action.type);

    switch (action.type) {
        case authenticationActions.SHOW_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: true,
                error: null
            }
        case authenticationActions.HIDE_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: false,
                error: null
            }
        case authenticationActions.AUTHENTICATION_PENDING:
            return {
                ...state,
                pending: true,
                error: null
            }
        case authenticationActions.AUTHENTICATION_SUCCESS:
            return {
                ...state,
                showLoginDialog: false,
                pending: false,
                user: action.user,
                accessToken: action.accessToken
            }
        case authenticationActions.AUTHENTICATION_ERROR:
            return {
                ...state,
                pending: false,
                error: 'Authentication failed'
            }
        case authenticationActions.LOG_OUT:
            return {
                ...state,
                pending: false,
                user: action.user,
                accessToken: action.accessToken
            }
        case authenticationActions.SING_UP_PENDING:
            return {
                ...state,
                pending: true,
                error: null
            }
        case authenticationActions.SING_UP_SUCCESS:
            return {
                ...state,
                pending: false,
                status: action.status,
            }
        case authenticationActions.SING_UP_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state;
    }
};
