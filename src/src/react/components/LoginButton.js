import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';

import { getShowLoginDialogAction } from '../../redux/authentication/AuthenticationActions';

class LoginButton extends Component{

    constructor(props){
        super(props);
        this.showLoginDialog = this.showLoginDialog.bind(this);
    }

    showLoginDialog(){
        const dispatch = this.props.dispatch;
        dispatch(getShowLoginDialogAction());
    }

    render(){
        return (
            <div>
                <Button id='OpenLoginDialogButton' variant="secondary" size="lg" active onClick = { this.showLoginDialog }>
                    Login
                </Button>
            </div>
        )
    }
}

export default connect() (LoginButton);