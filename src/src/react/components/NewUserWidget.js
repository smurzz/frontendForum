import React, { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { Modal, Button, Form, Image, ToggleButton } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as userActions from '../../redux/user/UserActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../layout/css/cover.css';

function NewUserWidget (props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [user, setUser] = useState(
        {
            userID: "",
            userName: "",
            password: "",
            isAdministrator: false
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        props.createUserAction(user);
        setUser({
            userID: "",
            userName: "",
            password: "",
            isAdministrator: false
        });
        props.refresh();
    }

    return (
        <>
            <Button className="block-example border border-0 border-dark mb-4" id="OpenCreateUserDialogButton" onClick={handleShow} style={{ background: '#fff' }}>
                <BsPlusCircle size={48} color={'#565e64'} style={{ background: '#fff' }} />
            </Button>

            <Modal className="modal fade" show={show} onHide={handleClose} >
                <Modal.Header className="modal-header border-bottom-0" closeButton></Modal.Header>
                <Modal.Body className="modal-body d-flex flex-column text-center">
                    <Form className="form-signin">
                        <Image className="mb-4" src={require("../../layout/icons/logoRound.png")} alt="Logo" width="72" height="72" />
                        <h3 className="h3 mb-3 font-weight-normal">Create user</h3>

                        <Form.Control
                            className="form-control"
                            type="text"
                            id="UserIDInput"
                            name='userID'
                            placeholder="User ID"
                            value={user.userID}
                            onChange={async (e) => { setUser({ ...user, userID: e.target.value }) }}
                            required
                            autoFocus />
                        <Form.Control
                            className="form-control"
                            type="text"
                            id="UserNameInput"
                            name='userName'
                            placeholder="User Name"
                            value={user.userName}
                            onChange={async (e) => { setUser({ ...user, userName: e.target.value }) }}
                            required />
                        <Form.Control
                            className="form-control"
                            type="password"
                            id="PasswordInput"
                            name='password'
                            placeholder="Password"
                            value={user.password}
                            onChange={async (e) => { setUser({ ...user, password: e.target.value }) }}
                            required />
                        <ToggleButton
                            className="mb-2"
                            id="IsAdministratorInput"
                            type="checkbox"
                            variant="outline-primary"
                            name="isAdministrator"
                            checked={user.isAdministrator}
                            onChange={async (e) => { setUser({ ...user, isAdministrator: e.target.checked }) }}
                            required
                        >
                            Admin
                        </ToggleButton>
                        <Button
                            type="submit"
                            id="CreateUserButton"
                            variant="secondary"
                            size="lg"
                            onClick={handleSubmit}>
                            Create
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
        createUserAction: (user) => dispatch(userActions.createUser(user))
    }
}

const ConnectedNewUserWidget = connect(null, mapDispatchToProps)(NewUserWidget)
export default ConnectedNewUserWidget;