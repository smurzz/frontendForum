import React, { Component } from 'react';
import UserComponent from '../components/UserComponent';
import '../../layout/css/userManagement.css';

class UserManamementPage extends Component {

    render() {
        return (
            <div >
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">Nutzerverwaltung</h1>
                </div>       
                <div className="container">
                    < UserComponent />
                </div>
            </div>
        )
    }
}

export default UserManamementPage;