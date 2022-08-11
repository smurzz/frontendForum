import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';
import NewForumWidget from '../components/NewForumWidget';
import EditForumWidget from '../components/EditForumWidget';
import DeleteForumWidget from '../components/DeleteForumWidget';

import * as forumActions from '../../redux/forum/ForumThreadActions';

const mapStateToPrors = state => {
    return {
        forumData: state.forums
    };
}

function ForumThreadComponent({ forumData, getForumsAction }) {
    const [counter, updateCounter] = useState(0);
    const userSession = JSON.parse(localStorage.getItem('userSession'));

    useEffect(() => {
        getForumsAction();
    }, [counter, getForumsAction]);

    const incrementCounter = () => {
        updateCounter(counter + 1);
    }

    return (
        forumData.pending ? (
            <h2 className="display-6 text-center">Loading...</h2>
        ) : forumData.error ? (
            <h2 className="display-6 text-center">{forumData.error}</h2>
        ) : (
            <div className="main">
                <div className="jumbotron">
                    <div className="container">
                        <h1 className="display-3">Create your forum!</h1>
                        <p>Creating great forum posts helps to ensure quality discussion and better engagement. If you are a member of a community and you want it to be vibrant and a great place for others, the above rules will ensure it's a great experience for everyone. What are your tips for great forum posts? Did we miss any?</p>
                        < NewForumWidget refresh={incrementCounter}/>
                    </div>
                </div>
                <div className='container'>
                    <div className="row" id='ForumThreadList'>
                        {forumData && forumData.forums && Object.values(forumData.forums).map(forum => {
                            var editButton;
                            var deleteButton;

                            if(userSession.user.userID === forum.ownerID){
                                editButton = (< EditForumWidget forum={forum} refresh={incrementCounter}/>);
                                deleteButton = (< DeleteForumWidget forum={forum} refresh={incrementCounter}/>);
                            }
                            
                            const forumThreadID = forum._id;
                            const dateCreation = new Date(forum.createdAt);
                            const dateUpdating = new Date(forum.updatedAt);
                            return <div className="col-md-4 mt-3 forumThread" id={'ForumThread' + forumThreadID} key={forum._id}>
                                <h2>
                                    <Link id={'ViewForumThreadButton' + forumThreadID} className="link-dark text-decoration-none" to={'/forumPage/' + forumThreadID} >{forum.name}</Link>
                                </h2>
                                <h6>{"Created at: " + dateCreation.getHours() + ":" + dateCreation.getMinutes() + ", " + dateCreation.toDateString()}</h6>
                                <h6>{"Updated at: " + dateUpdating.getHours() + ":" + dateUpdating.getMinutes() + ", " + dateUpdating.toDateString()}</h6>
                                <p><em>{"Author: " + forum.ownerID}</em></p>
                                <p>{forum.description}</p>
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

const mapDispatchToProps = dispatch => bindActionCreators({
    getForumsAction: forumActions.getForums
}, dispatch)

const ConnectedForumsComponent = connect(mapStateToPrors, mapDispatchToProps)(ForumThreadComponent)

export default ConnectedForumsComponent;