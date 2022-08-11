import React, { useState } from "react";
import { Modal, Button, Form, Image } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as messageActions from '../../redux/messages/MessageActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../layout/css/cover.css';

function NewMessageWidget (props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [message, setMessage] = useState(
        {
            forumThreadID: props.forumID,
            title: "",
            text: ""
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        props.createMessageAction(message);
        setMessage({
            forumThreadID: props.forumID,
            title: "",
            text: ""
        });
        props.refresh();
    }

    return (
        <>
            <Button id='OpenCreateForumMessageDialogButton' variant="primary" size="lg" onClick={handleShow} > Create message </Button>

            <Modal className="modal fade" show={show} onHide={handleClose} >
                <Modal.Header className="modal-header border-bottom-0" closeButton></Modal.Header>
                <Modal.Body className="modal-body d-flex flex-column text-center">
                    <Form className="form-signin">
                        <Image className="mb-4" src={require("../../layout/icons/logoRound.png")} alt="Logo" width="72" height="72" />
                        <h3 className="h3 mb-3 font-weight-normal">Create message</h3>

                        <Form.Control
                            className="form-control"
                            type="text"
                            id="ForumMessageTitleInput"
                            name='title'
                            placeholder="Title"
                            value={message.title}
                            onChange={async (e) => { setMessage({ ...message, title: e.target.value }) }}
                            required
                            autoFocus />
                        <Form.Control
                            className="form-control"
                            as='textarea'
                            rows={3}
                            id="ForumMessageTextInput"
                            name='text'
                            placeholder="Text"
                            value={message.text}
                            onChange={async (e) => { setMessage({ ...message, text: e.target.value }) }}
                            required />
                        <Button
                            type="submit"
                            id="CreateForumMessageButton"
                            variant="secondary"
                            size="lg"
                            onClick={handleSubmit}>
                            Create
                        </Button>
                        <Button
                            className="mt-3"
                            type="reset"
                            id="CancelCreateForumMessageButton"
                            variant="outline-secondary"
                            size="lg"
                            onClick={handleClose}
                            style={{backgroundColor: '#ced4da'}}>
                            Cancel
                        </Button>
                        <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        createMessageAction: (message) => dispatch(messageActions.createMessage(message))
    }
}

const ConnectedNewMessageWidget = connect(null, mapDispatchToProps)(NewMessageWidget)
export default ConnectedNewMessageWidget;