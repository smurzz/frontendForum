import { useState, useEffect } from "react";
import { Modal, Button, Form, Image, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as authenticationActions from '../../redux/authentication/AuthenticationActions';

const mapStateToPrors = state => {
    const { auth } = state
    return auth;
}

function SignupButton(props) {
    var generalErrorMessage;
    var errorPassMessage;
    var formContent;

    const [user, setUser] = useState(
        {
            userID: "",
            userName: "",
            email: "",
            password: ""
        });

    const [password, setPassword] = useState('');
    const [matchPass, setMatchPass] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const match = password === matchPass;
        setValidMatch(match);
    }, [password, matchPass]);

    useEffect(() => {
        const resSuccess = props.status === 200;
        setSuccess(resSuccess);
    }, [props.status, props.signupUserAction]);

    useEffect(() => {
        const resError = props.error !== null;
        setError(resError);
    }, [props.error]);

    const handleClose = () => { setSuccess(false); setError(false); setShow(false); }
    const handleShow = () => setShow(true);
    const handleSubmit = async (e) => {
        e.preventDefault();
        props.signupUserAction(user);
        setUser({
            userID: "",
            userName: "",
            email: "",
            password: ""
        });
    }
    
    if (!validMatch) {
        errorPassMessage = (
            <Alert id="errorPassMessage" className="text-center mt-3" key='danger' variant='danger'>
                Password must match the first password.
            </Alert>);
    }

    if (error === true) {
        generalErrorMessage = (
            <Alert className="text-center mt-3" variant='danger'>
                User with specified userID or email already exists.
            </Alert>);
    } 

    formContent = (<Form className="form-signin">
        <Image className="mb-4" src={require("../../layout/icons/logoRound.png")} alt="Logo" width="72" height="72" />
        <h3 className="h3 mb-3 font-weight-normal">Register</h3>

        <Form.Control
            className="form-control"
            type="text"
            id="RegisterUserIDInput"
            name='userID'
            placeholder="User ID"
            onChange={async (e) => { setUser({ ...user, userID: e.target.value }) }}
            required
            autoFocus />
        <Form.Control
            className="form-control"
            type="text"
            id="RegisterUserNameInput"
            name='userName'
            placeholder="User Name"
            onChange={async (e) => { setUser({ ...user, userName: e.target.value }) }}
            required />
        <Form.Control
            className="form-control"
            type="email"
            id="RegisterUserEmailInput"
            name='email'
            placeholder="Email"
            onChange={async (e) => { setUser({ ...user, email: e.target.value }) }}
            required />
        <Form.Control
            className="form-control"
            type="password"
            id="RegisterPasswordInput"
            name='password'
            placeholder="Password"
            onChange={async (e) => { setUser({ ...user, password: e.target.value }); setPassword(e.target.value); }}
            required />
        <Form.Control
            className="form-control"
            type="password"
            id="RegisterPasswordConfirmInput"
            name='matchPass'
            placeholder="Password again"
            onChange={(e) => setMatchPass(e.target.value)}
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="errorPassMessage"
            required />
        <Button
            disabled={user.userID === "" || user.userName === "" || user.email === "" || user.password === "" || !validMatch ? true : false}
            type="submit"
            id="SignUpButton"
            variant="secondary"
            size="lg"
            onClick={handleSubmit}
            href={'/confirmationPage'}>

            Sign up
        </Button>

        {errorPassMessage}
        {generalErrorMessage}

        <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
    </Form>);

    if(success === true) {
        formContent = (
            <Alert className="text-center mt-3" key='success' variant='success'>
                <h1 className="cover-heading">Thank you for registration!</h1>
                <p className="lead">An email with your account confirmation link has been sent to your email.</p>
                <p>Check your email and come back to login!</p>
            </Alert>);
    }

    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow} style={{ marginLeft: '1rem' }}>
                Sign up
            </Button>

            <Modal className="modal fade" show={show} onHide={handleClose}>
                <Modal.Header className="modal-header border-bottom-0" closeButton></Modal.Header>
                <Modal.Body className="modal-body d-flex flex-column text-center">
                    {formContent}
                </Modal.Body>
            </Modal>
        </>);
}

const mapDispatchToProps = dispatch => {
    return {
        signupUserAction: (user) => dispatch(authenticationActions.signupUser(user))
    }
}

const ConnectedSignupButton = connect(mapStateToPrors, mapDispatchToProps)(SignupButton)
export default ConnectedSignupButton;