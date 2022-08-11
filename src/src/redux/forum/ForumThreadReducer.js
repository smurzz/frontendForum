import * as forumActions from "./ForumThreadActions";

const initialState = {
    forums: [],
    loginPending: false,
    error: null
};

export default function forumReducer(state = initialState, action) {

    console.log('Bin in ForumReducer: ' + action.type);

    switch (action.type) {
        case forumActions.REQUEST_READ_FORUMS:
            return {
                ...state,
                showLoginDialog: true,
                error: null
            }
        case forumActions.SUCCESS_READ_FORUMS:
            return {
                ...state,
                pending: false,
                forums: action.forums,
                error: null
            }
        case forumActions.FAIL_READ_FORUMS:
            return {
                ...state,
                pending: false,
                forums: [],
                error: action.error
            }
        case forumActions.REQUEST_CREATE_FORUM:
            return {
                ...state,
                showLoginDialog: true,
                error: null
            }
        case forumActions.SUCCESS_CREATE_FORUM:
            return {
                ...state,
                pending: false,
                status: action.status,
                error: null
            }
        case forumActions.FAIL_CREATE_FORUM:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case forumActions.REQUEST_EDIT_FORUM:
            return {
                ...state,
                showLoginDialog: true,
                error: null
            }
        case forumActions.SUCCESS_EDIT_FORUM:
            return {
                ...state,
                pending: false,
                status: action.status,
                error: null
            }
        case forumActions.FAIL_EDIT_FORUM:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case forumActions.REQUEST_DELETE_FORUM:
            return {
                ...state,
                showLoginDialog: true,
                error: null
            }
        case forumActions.SUCCESS_DELETE_FORUM:
            return {
                ...state,
                pending: false,
                status: action.status,
                error: null
            }
        case forumActions.FAIL_DELETE_FORUM:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state;
    }
};