import React from 'react';
import { render } from 'react-dom';
import Login from './Login';
import HomePage from './HomePage';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.loggedIn = this.loggedIn.bind(this);
        this.getUserName = this.getUserName.bind(this);
        this.back = this.back.bind(this);

        this.state = {
            loggedIn: this.loggedIn(),
            homePage: this.props.homePage,
            username: ""
        }
    }

    componentDidMount() {
        if (this.state.loggedIn) {
            this.getUserName();
        }
    }

    back() {
        render(
            <HomePage />,
            document.getElementById('app')
        );
    }

    loggedIn() {
        var accountInfo = JSON.parse(localStorage.getItem("oneWordStoriesAccessToken"));
        
        if (accountInfo == null || Math.floor(Date.now() / 1000) - accountInfo.timeSet >= 3600) {
            return false;
        }

        return true
    }

    getUserName() {
        var requestUrl = "https://oauth.reddit.com/api/v1/me";
        var header = {
            Authorization: "bearer " + JSON.parse(localStorage.getItem("oneWordStoriesAccessToken")).accessToken
        };

        $.ajax({
            type: "get",
            url: requestUrl,
            headers: header,
            success: function (data) {
                this.setState({
                    loggedIn: this.loggedIn(),
                    homePage: this.props.homePage,
                    username: data.name
                });
            }.bind(this),
            fail: function (e) {
                console.log(e);
            }
        });
    }

    render() {
        var loginButton = !this.state.loggedIn ? <Login /> : <h2 style={{color: "white"}}>{this.state.username}</h2>;
        var backButton = "";

        if (!this.props.homePage) {
            var backButton = <button onClick={this.back}>Back</button>
        }
        return (
            <header style={{
                backgroundColor: "purple",
                color: "whitesmoke",
                height: "64px",
                top: "0",
                width: "100%",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                position: "fixed",
                zIndex: "3",
            }}>
                {backButton}
                <h1 style={{
                    color: "white"
                }}>One Word Stories</h1>
                {loginButton}
            </header>
        );
    }
}

export default Header;