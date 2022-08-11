import React, { useState } from "react";
import { Modal, Button, Form, Image } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as messageActions from '../../redux/messages/MessageActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../layout/css/cover.css';

function EditMessageWidget (props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [message, setMessage] = useState(
        {
            title: props.message.title,
            text: props.message.text
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({
            title: message.title,
            text: message.text
        });
        props.editMessageAction(props.message._id, message);
        props.refresh();
        setShow(false);
    }

    return (
        <>
            <Button id={"EditMessageButton" + props.message._id} className='m-2' variant="secondary" size='lg' onClick={handleShow}> Edit </Button>

            <Modal className="modal fade" show={show} onHide={handleClose} >
                <Modal.Header className="modal-header border-bottom-0" closeButton></Modal.Header>
                <Modal.Body className="modal-body d-flex flex-column text-center">
                    <Form className="form-signin">
                        <Image className="mb-4" src={require("../../layout/icons/logoRound.png")} alt="Logo" width="72" height="72" />
                        <h3 className="h3 mb-3 font-weight-normal">Edit message</h3>

                        <Form.Control
                            className="form-control"
                            type="text"
                            id="MessageTitleInput"
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
                            id="MessageTextInput"
                            name='text'
                            placeholder="Text"
                            value={message.text}
                            onChange={async (e) => { setMessage({ ...message, text: e.target.value }) }}
                            required />
                        <Button
                            type="submit"
                            id="SaveMessageButton"
                            variant="secondary"
                            size="lg"
                            onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button
                            className="mt-3"
                            type="reset"
                            id="CancelMessageButton"
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
        editMessageAction: (messageID, message) => dispatch(messageActions.editMessage(messageID, message))
    }
}

const ConnectedEditMessageWidget = connect(null, mapDispatchToProps)(EditMessageWidget)
export default ConnectedEditMessageWidget;