import React, { Component } from 'react'
import '../../layout/css/cover.css';
import UserSessionWidget from './UserSessionWidget';
import SignupButton from './SignupButton';

class TopMenu extends Component {
    render() {
        return (
            <header className="masthead mb-auto">
            <div className="inner">
                <h3 className="masthead-brand">YourForum</h3>
                <nav className="nav nav-masthead justify-content-center">
                    {/* <a className="nav-link active" href="*">Home</a> */}
                    <UserSessionWidget />
                    <SignupButton />
                </nav>
            </div>
        </header>
        )
    }
}

export default TopMenu;
