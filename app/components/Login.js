import React from 'react';

const clientID = "7q7ZIqo0EGoJPA";

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.OAuth = this.OAuth.bind(this)
    }

    OAuth() {
        var redirectURI = "http://localhost:8080/";
        var scopes = ["identity"];

        var userURL = "https://www.reddit.com/api/v1/authorize?client_id=" + clientID +
        "&redirect_uri=" + encodeURIComponent(redirectURI) +
        "&scope=" + encodeURIComponent(scopes.join(' ')) +
        "&response_type=code&state=wiuejdcwcwainc";

        window.location.href = userURL;

        // $.ajax({
        //     type: "POST",
        //     url: "https://www.reddit.com/api/v1/authorize?client_id=W_dxhOX3sSUKe-vGjIB_bnn_y6M&response_type=code&state=sREsxwIfTsdesH&redirect_uri=localhost:8080&duration=temporary&scope=identity",
        //     username: "7q7ZIqo0EGoJPA",
        //     password: "W_dxhOX3sSUKe-vGjIB_bnn_y6M",
        //     dataType: "jsonp",
        //     data: {
        //         grant_type: "password",
        //         username: "eotsc",
        //         password: "cljjcfkp"
        //     },
        //     success: function (data) {
        //         console.log(data);
        //     },
        //     error: function (e) {
        //         console.log(e);
        //     }
        // });
    }

    render() {
        return <button onClick={this.OAuth}>Login</button>;
    }
}

export default Login;