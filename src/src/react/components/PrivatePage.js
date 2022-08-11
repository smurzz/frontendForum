import React, { Component } from 'react'
import '../../layout/css/starter-template.css';

class PrivatePage extends Component {
    render() {
        return (
            <div>
                <main role="main" className="container">
                    <div className="starter-template">
                        <h1>Welcome!</h1>
                        <p className="lead">YourForum offers to create free forums, private and easy to manage. Do you want to share your
                            passion? Create your own forum for your business? To ensure discussions are only between your members,
                            Forumotion allows you to create a 100% private forum for confidential forum groups. You control access to your
                            discussion forum. To do this, you just need to go to our creation page and launch your personal forum in a
                            minute.</p>
                    </div>
                </main>
            </div>
        )
    }
}

export default PrivatePage;