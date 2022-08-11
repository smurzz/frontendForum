import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as forumActions from '../../redux/forum/ForumThreadActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../layout/css/cover.css';

function DeleteForumWidget(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        props.deleteForumAction(props.forum._id);
        props.refresh();
        setShow(false);
    }

    return (
        <>
            <Button id={"DeleteForumThreadButton" + props.forum._id} variant="outline-secondary" size='lg' onClick={handleShow}> Delete </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Do you want delete forum "{props.forum.name}"? </Modal.Title>
                </Modal.Header>
                <Modal.Body>The forum will be permanently removed from the database.</Modal.Body>
                <Modal.Footer>
                    <Button id="DeleteForumThreadConfirm" variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button id="DeleteForumThreadCancel" variant="primary" onClick={handleSubmit}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        deleteForumAction: (forumID) => dispatch(forumActions.deleteForum(forumID))
    }
}

const ConnectedDeleteForumWidget = connect(null, mapDispatchToProps)(DeleteForumWidget)
export default ConnectedDeleteForumWidget;