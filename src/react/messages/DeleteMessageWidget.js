import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as messageActions from '../../redux/messages/MessageActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../layout/css/cover.css';

function DeleteMessageWidget(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        props.deleteMessageAction(props.message._id);
        props.refresh();
        setShow(false);
    }

    return (
        <>
            <Button id={"DeleteMessageButton" + props.message._id} variant="outline-secondary" size='lg' onClick={handleShow}> Delete </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Do you want to delete message "{props.message.title}"? </Modal.Title>
                </Modal.Header>
                <Modal.Body>Once deleted, the message cannot be restored.</Modal.Body>
                <Modal.Footer>
                    <Button id="DeleteMessageConfirm" variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button id="DeleteMessageCancel" variant="primary" onClick={handleSubmit}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        deleteMessageAction: (messageID) => dispatch(messageActions.deleteMessage(messageID))
    }
}

const ConnectedDeleteMessageWidget = connect(null, mapDispatchToProps)(DeleteMessageWidget)
export default ConnectedDeleteMessageWidget;