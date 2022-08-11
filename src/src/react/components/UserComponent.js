import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as userActions from '../../redux/user/UserActions';
import DeleteUserWidget from '../components/DeleteUserWidget';
import EditUserWidget from '../components/EditUserWidget';
import NewUserWidget from '../components/NewUserWidget';
import '../../layout/css/cover.css';
import '../../layout/css/userManagement.css';

const mapStateToPrors = state => {
    return {
        userData: state.users
    };
}

function UserComponent({ userData, getUsersAction }) {
    const [counter, updateCounter] = useState(0);
   
    useEffect(() => {
        getUsersAction();
    }, [counter, getUsersAction]); 

    const incrementCounter = () => {
        updateCounter(counter + 1);
    }

    return (
        userData.pending ? (
            <h2 className="display-6 text-center">Loading...</h2>
        ) : userData.error ? (
            <h2 className="display-6 text-center">{userData.error}</h2>
        ) : (
            <div>
                < NewUserWidget refresh={incrementCounter} />
                <div className="card-deck mb-3 text-center d-flex justify-content-evenly flex-wrap">
                
                {userData && userData.users && Object.values(userData.users).map(user => {
                    return <div className="card mb-4 box-shadow" id={'UserItem' + user.userID} key={user.userID} style={{ minWidth: '25rem' }} >
                        <div className="card-header">
                            <h4 className="my-0 font-weight-normal">{user.userName}</h4>
                        </div>
                        <div className="card-body">
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>User ID: {user.userID}</li>
                                <li>Status: Active</li>
                                <li>Authentifiuierung: Default</li>
                            </ul>
                        </div>
                        <EditUserWidget userInfo={ user } refresh={incrementCounter}/>
                        <DeleteUserWidget userID={ user.userID } refresh={incrementCounter}/>
                    </div>;
                }
                )}
            </div>
            </div>
        )
    )
}

/**/

const mapDispatchToProps = dispatch => bindActionCreators({
    getUsersAction: userActions.getUsers
}, dispatch)

const ConnectedUserComponent = connect(mapStateToPrors, mapDispatchToProps)(UserComponent)

export default ConnectedUserComponent;