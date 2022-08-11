import React, { useState } from "react";
import { Modal, Button, Form, Image, ToggleButton } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as userActions from '../../redux/user/UserActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../layout/css/cover.css';

function EditUserWidget (props) {
    
    let successMsg;
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(
        {
            userID: props.userInfo.userID,
            userName: props.userInfo.userName,
            password: props.userInfo.password,
            isAdministrator: props.userInfo.isAdministrator
        });

    console.log(props.userInfo.userName);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUser({
            userID: user.userID,
            userName: user.userName,
            password: user.password,
            isAdministrator: user.isAdministrator
        });
        props.editUserAction(user.userID, user);
        props.refresh();
        setShow(false);
   }

    return (
        <>
            <Button className="btn m-2" id={"EditButton" + props.userInfo.userID} variant="secondary" size="lg" onClick={handleShow} active>Edit</Button>

            <Modal className="modal fade" show={show} onHide={handleClose} >
                <Modal.Header className="modal-header border-bottom-0" closeButton></Modal.Header>
                <Modal.Body className="modal-body d-flex flex-column text-center">
                    <Form className="form-signin">
                        <Image className="mb-4" src={require("../../layout/icons/logoRound.png")} alt="Logo" width="72" height="72" />
                        <h3 className="h3 mb-3 font-weight-normal">Edit user</h3>

                        <Form.Control
                            className="form-control"
                            type="text"
                            id="UserIDInput"
                            name='userID'
                            placeholder="User ID"
                            value={user.userID}
                            onChange={async (e) => { setUser({ ...user, userID: e.target.value }) }}
                            disabled
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
                            id="SaveUserButton"
                            variant="secondary"
                            size="lg"
                            onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button
                            className="mt-3"
                            type="reset"
                            id="CancelEditUserButton"
                            variant="outline-secondary"
                            size="lg"
                            onClick={handleClose}
                            style={{backgroundColor: '#ced4da'}}>
                            Cancel
                        </Button>
                        {successMsg}
                        <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        editUserAction: (userID, user) => dispatch(userActions.editUser(userID, user))
    }
}

const ConnectedEditUserWidget = connect(null, mapDispatchToProps)(EditUserWidget)

export default ConnectedEditUserWidget;