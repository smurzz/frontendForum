import React, { useState } from "react";
import { Modal, Button, Form, Image } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as forumActions from '../../redux/forum/ForumThreadActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../layout/css/cover.css';

function EditForumWidget (props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [forum, setForum] = useState(
        {
            name: props.forum.name,
            description: props.forum.description
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setForum({
            name: forum.name,
            description: forum.description
        });
        props.editForumAction(props.forum._id, forum);
        props.refresh();
        setShow(false);
    }

    return (
        <>
            <Button id={"EditFormThreadButton" + props.forum._id} className='m-2' variant="secondary" size='lg' onClick={handleShow}> Edit </Button>

            <Modal className="modal fade" show={show} onHide={handleClose} >
                <Modal.Header className="modal-header border-bottom-0" closeButton></Modal.Header>
                <Modal.Body className="modal-body d-flex flex-column text-center">
                    <Form className="form-signin">
                        <Image className="mb-4" src={require("../../layout/icons/logoRound.png")} alt="Logo" width="72" height="72" />
                        <h3 className="h3 mb-3 font-weight-normal">Edit forum</h3>

                        <Form.Control
                            className="form-control"
                            type="text"
                            id="ForumThreadNameInput"
                            name='name'
                            placeholder="Name"
                            value={forum.name}
                            onChange={async (e) => { setForum({ ...forum, name: e.target.value }) }}
                            required
                            autoFocus />
                        <Form.Control
                            className="form-control"
                            as='textarea'
                            rows={3}
                            id="ForumThreadDescriptionInput"
                            name='description'
                            placeholder="Description"
                            value={forum.description}
                            onChange={async (e) => { setForum({ ...forum, description: e.target.value }) }}
                            required />
                        <Button
                            type="submit"
                            id="SaveForumThreadButton"
                            variant="secondary"
                            size="lg"
                            onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button
                            className="mt-3"
                            type="reset"
                            id="CancelEditForumThreadButton"
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
        editForumAction: (forumID, forum) => dispatch(forumActions.editForum(forumID, forum))
    }
}

const ConnectedEditForumWidget = connect(null, mapDispatchToProps)(EditForumWidget)
export default ConnectedEditForumWidget;