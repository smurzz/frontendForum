import React, { Component } from 'react'
import '../../layout/css/cover.css';
import TopMenuPrivatePage from '../components/TopMenuPrivatePage';

class UserHomePage extends Component {
    render() {
        return ( 
            <div id='PrivatePage'>
               <TopMenuPrivatePage user={ this.props.user }/>
            </div>
        )
    }
}

export default UserHomePage;