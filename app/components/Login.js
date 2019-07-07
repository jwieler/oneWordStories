import React from 'react';

const clientID = "7q7ZIqo0EGoJPA";
const redirectURI = "http://localhost:8080/";
const scopes = ["vote", "read", "identity"];

const userURL = "https://www.reddit.com/api/v1/authorize?client_id=" + clientID +
    "&redirect_uri=" + encodeURIComponent(redirectURI) +
    "&scope=" + encodeURIComponent(scopes.join(' ')) +
    "&response_type=code&state=wiuejdcwcwainc";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.OAuth = this.OAuth.bind(this);
    }

    OAuth() {
        window.location.href = userURL;
    }

    render() {
        return <button style={{
            position: "absolute",
            top: "20px",
            right: "10px"
        }} onClick={this.OAuth}>Login</button>;
    }
}

export default Login;