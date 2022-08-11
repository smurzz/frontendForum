import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as userActions from '../../redux/user/UserActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../layout/css/cover.css';

function DeleteUserWidget(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        props.deleteUserAction(props.userID);
        props.refresh();
        setShow(false);
    }

    return (
        <>
            <Button className="btn m-2" id={"DeleteButton" + props.userID} variant="outline-secondary" size="lg" onClick={handleShow}>Delete</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Do you want delete user {props.userID}? </Modal.Title>
                </Modal.Header>
                <Modal.Body>The user will be permanently removed from the database.</Modal.Body>
                <Modal.Footer>
                    <Button id="DeleteUserCancel" variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button id="DeleteUserConfirm" variant="primary" onClick={handleSubmit}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        deleteUserAction: (userID) => dispatch(userActions.deleteUser(userID))
    }
}

const ConnectedDeleteUserWidget = connect(null, mapDispatchToProps)(DeleteUserWidget)
export default ConnectedDeleteUserWidget;