import React, { Component } from 'react'
import '../../layout/css/cover.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import UserSessionWidget from '../components/UserSessionWidget';
import UserManamementPage from '../user/UserManagementPage';
import PrivatePage from '../pages/PrivatePage';
import NotFound from '../pages/NotFoundPage';
import ForumThreadPage from '../forum/ForumThreadPage';
import MessagePage from '../messages/MessagePage';

class TopMenuPrivatePage extends Component {

    render() {

        var linkToUserManagement;
        var linkToForumThreds;

        if (this.props.user.isAdministrator) {
            linkToUserManagement = (<Nav.Link id='OpenUserManagementButton' as={NavLink} to='/userManagement'>User-Management</Nav.Link>);
        }
        if(this.props.user){
            linkToForumThreds = (<Nav.Link id='OpenForumThreadOverviewButton' as={NavLink} to='/forumPage'>Forums</Nav.Link>);
        }

        const Links = () => {
            return (
                <Navbar className='fixed-top' collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand as={NavLink} to='/'>YourForum</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link id='OpenPrivatePageButton' as={NavLink} to='/'>Home</Nav.Link>
                                {linkToForumThreds}
                                {linkToUserManagement}
                            </Nav>
                            <Nav>
                                <Nav.Link href="*" disabled> Hi, {this.props.user.userName} </Nav.Link>
                                <UserSessionWidget />
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            );
        };

        return (
            <Router>
                <div>
                    <Links />
                    <Routes>
                        <Route path="/" element={<PrivatePage />} />
                        <Route path="/userManagement" element={<UserManamementPage />} />
                        <Route path="/forumPage" element={<ForumThreadPage />} />
                        <Route path='/forumPage/:forumThreadID' element={<MessagePage/>} />  
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </div>
            </Router>
        )
    }
}

export default TopMenuPrivatePage;
