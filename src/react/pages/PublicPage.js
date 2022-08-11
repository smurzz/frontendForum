import React, { Component } from 'react'
import '../../layout/css/cover.css';
import LoginButton from '../components/LoginButton';

class PublicPage extends Component {
    render() {
        return (
            <main role="main" className="inner cover">
                <h1 className="cover-heading">Create your forum.</h1>
                <p className="lead">Once you've created your forum, you can begin inviting friends and hosting discussions
                    immediately. Take advantage of our rich features and enjoy the most popular free forum hosting service
                    on the Internet!</p>
                <LoginButton />  
            </main>
        )
    }
}

export default PublicPage;