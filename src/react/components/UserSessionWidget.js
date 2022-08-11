import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../layout/css/cover.css';

import { Modal, Button, Form, Image, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as authenticationActions from '../../redux/authentication/AuthenticationActions';
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import HomePage from "../pages/HomePage";

const mapStateToPrors = state => {
    const { auth } = state
    return auth;
}

class UserSessionWidget extends Component {

    constructor(props) {
        super(props);
        this.state = { userID: '', password: '' };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleShow(e) {
        e.preventDefault();
        // this.setState( {show: true} );
        const { showLoginDialogAction } = this.props;
        showLoginDialogAction();
    }

    handleClose() {
        // this.setState( {show: false} );
        const { hideLoginDialogAction } = this.props;
        hideLoginDialogAction();
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { userID, password } = this.state;
        const { authenticateUserAction } = this.props;
        authenticateUserAction(userID, password);
    }

    handleLogout() {
        const { logoutUserAction } = this.props;
        logoutUserAction();
    }

    render() {

        var showDialog = this.props.showLoginDialog;
        
        if (showDialog === undefined) {
            showDialog = false;
        }

        let button;
        let messageText;
        let userSession = JSON.parse(localStorage.getItem('userSession'));

        if (!this.props.accessToken && !this.props.user && !userSession ) {
            button = (
                <Button variant="outline-info" onClick={this.handleShow} style={{ marginLeft: '1rem' }}>
                    Login
                </Button>)
        } else {
            button = (
                <Link to='/' path={< HomePage />}>
                    <Button id="LogoutButton" variant="outline-info" onClick={this.handleLogout} style={{ marginLeft: '1rem' }}>
                        Logout
                    </Button>
                </Link>)
        }

        if (this.props.error) {
            messageText = (<Alert className="text-center mt-3" key='danger' variant='danger'>
                User ID or password is false.
            </Alert>)
        }

        return (
            <>
                {button}

                <Modal className="modal fade" show={showDialog} onHide={this.handleClose} >
                    <Modal.Header className="modal-header border-bottom-0" closeButton></Modal.Header>
                    <Modal.Body className="modal-body d-flex flex-column text-center">
                        <Form className="form-signin">
                            <Image className="mb-4" src={require("../../layout/icons/logoRound.png")} alt="Logo" width="72" height="72" />
                            <h3 className="h3 mb-3 font-weight-normal">Login</h3>

                            <Form.Control className="form-control" type="text" id="LoginUserIDInput" name='userID' placeholder="User ID" onChange={this.handleChange} required autoFocus />
                            <Form.Control className="form-control" type="password" id="LoginPasswordInput" name='password' placeholder="Password" onChange={this.handleChange} required />
                           
                                <Button type="submit" id="LoginButton" variant="secondary" size="lg" onClick={this.handleSubmit} >
                                    Login
                                </Button>
                            {messageText}
                            <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showLoginDialogAction: authenticationActions.getShowLoginDialogAction,
    hideLoginDialogAction: authenticationActions.getHideLoginDialogAction,
    authenticateUserAction: authenticationActions.authenticateUser,
    logoutUserAction: authenticationActions.logoutUser
}, dispatch)

const ConnectedUserSessionWidget = connect(mapStateToPrors, mapDispatchToProps)(UserSessionWidget)

export default ConnectedUserSessionWidget;