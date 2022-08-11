import { combineReducers } from 'redux';
import authenticationReducer from './authentication/AuthenticationReducer';
import userReducer from '../redux/user/UserReducer';
import forumReducer from '../redux/forum/ForumThreadReducer';
import messageReducer from '../redux/messages/MessageReducer'

const rootReducer = combineReducers({
    auth: authenticationReducer,
    users: userReducer,
    forums: forumReducer,
    messages: messageReducer
});
export default rootReducer;