import React, { Component } from 'react'
import '../../layout/css/cover.css';
import TopMenu from '../components/TopMenu';
import PublicPage from '../components/PublicPage';
import Footer from '../components/Footer';

class HomePage extends Component {
    render() {
        return ( 
            <div id='LandingPage'>
                <style>{'body { background-color: #333; padding-top: 0; display: flex; -ms-flex-pack: center; justify-content: center; text-shadow: 0 .05rem .1rem rgba(0, 0, 0, .5); box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5); }}'}</style>
                <style>{' #LandingPage, .App { color: #fff; display: flex; flex-direction: column; height: 100%; padding: 1rem; margin: auto; text-align: center; max-width: 42em; }'}</style>
                <style>{'a, a:focus, a:hover {color: rgb(255, 255, 255); '}</style>
                <TopMenu /><PublicPage /><Footer />
            </div>
        )
    }
}

export default HomePage;