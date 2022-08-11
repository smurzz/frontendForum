import * as messageActions from "./MessageActions";

const initialState = {
    messages: [],
    loginPending: false,
    error: null
};

export default function messageReducer(state = initialState, action) {

    console.log('Bin in MessageReducer: ' + action.type);

    switch (action.type) {
        case messageActions.REQUEST_READ_MESSAGES:
            return {
                ...state,
                showLoginDialog: true,
                error: null
            }
        case messageActions.SUCCESS_READ_MESSAGES:
            return {
                ...state,
                pending: false,
                messages: action.messages,
                error: null
            }
        case messageActions.FAIL_READ_MESSAGES:
            return {
                ...state,
                pending: false,
                messages: [],
                error: action.error
            }
        case messageActions.REQUEST_CREATE_MESSAGE:
            return {
                ...state,
                showLoginDialog: true,
                error: null
            }
        case messageActions.SUCCESS_CREATE_MESSAGE:
            return {
                ...state,
                pending: false,
                status: action.status,
                error: null
            }
        case messageActions.FAIL_CREATE_MESSAGE:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case messageActions.REQUEST_EDIT_MESSAGE:
            return {
                ...state,
                showLoginDialog: true,
                error: null
            }
        case messageActions.SUCCESS_EDIT_MESSAGE:
            return {
                ...state,
                pending: false,
                status: action.status,
                error: null
            }
        case messageActions.FAIL_EDIT_MESSAGE:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case messageActions.REQUEST_DELETE_MESSAGE:
            return {
                ...state,
                showLoginDialog: true,
                error: null
            }
        case messageActions.SUCCESS_DELETE_MESSAGE:
            return {
                ...state,
                pending: false,
                status: action.status,
                error: null
            }
        case messageActions.FAIL_DELETE_MESSAGE:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state;
    }
};