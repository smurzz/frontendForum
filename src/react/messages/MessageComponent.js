import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import NewMessageWidget from './NewMessageWidget';
import EditMessageWidget from './EditMessageWidget';
import DeleteMessageWidget from './DeleteMessageWidget';
import * as messageActions from '../../redux/messages/MessageActions';

const mapStateToPrors = state => {
    return {
        messageData: state.messages
    };
}

function MessageComponent({ messageData, getMessagesAction }) {
    const [counter, updateCounter] = useState(0);
    const { forumThreadID } = useParams();
    const userSession = JSON.parse(localStorage.getItem('userSession'));
  
    useEffect(() => {
        getMessagesAction(forumThreadID);
    }, [counter, getMessagesAction, forumThreadID]);

    function incrementCounter() {
        updateCounter(counter + 1);
    }

    return (
        messageData.pending ? (
            <h2 className="display-6 text-center">Loading...</h2>
        ) : messageData.error ? (
            <h2 className="display-6 text-center">{messageData.error}</h2>
        ) : (
            <div className="main">
                <div className="jumbotron">
                    <div className="container">
                        <h1 className="display-3">Forum masseges</h1>
                        <p>Create a new message to your forum or reply to another user's message. Click on the button below to create a new message.</p>
                        < NewMessageWidget forumID={forumThreadID} refresh={incrementCounter}/>
                    </div>
                </div>
                <div className='container'>
                    <div className="row" id='ForumThreadList'>
                        {messageData && messageData.messages && Object.values(messageData.messages).map(message => {
                            var editButton;
                            var deleteButton;
                            if(userSession.user.userID === message.authorID){
                                editButton = (< EditMessageWidget message={message} refresh={incrementCounter}/>);
                                deleteButton = (< DeleteMessageWidget message={message} refresh={incrementCounter}/>);
                            }

                            const dateCreation = new Date(message.createdAt);
                            const dateUpdating = new Date(message.updatedAt);

                            return <div className="col-md-4 mt-3 forumMessage" id={'ForumMessage' + message._id} key={message._id}>
                                <h2>{message.title}</h2>
                                <h6>{"Created at: " + dateCreation.getHours() + ":" + dateCreation.getMinutes() + ", " + dateCreation.toDateString()}</h6>
                                <h6>{"Updated at: " + dateUpdating.getHours() + ":" + dateUpdating.getMinutes() + ", " + dateUpdating.toDateString()}</h6>
                                <p><em>{"Author: " + message.authorID}</em></p>
                                <p>{message.text}</p>
                                {editButton}
                                {deleteButton}
                            </div>
                        }
                        )}
                    </div>
                </div>
            </div>
        )
    )
}

const mapDispatchToProps = dispatch => {
    return {
        getMessagesAction: (forumID) => dispatch(messageActions.getMessages(forumID))
    }
}

const ConnectedMessageComponent = connect(mapStateToPrors, mapDispatchToProps)(MessageComponent)

export default ConnectedMessageComponent;