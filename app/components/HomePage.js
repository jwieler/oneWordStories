import React from 'react';
import NavButtons from './NavButtons';
import Login from './Login';

class HomePage extends React.Component {
    componentDidMount() {
        var search = location.search.substring(1);

        if (search) {
            var urlHash = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
                function (key, value) {

                    return key === "" ? value : decodeURIComponent(value);
                });

            if (urlHash["error"] == null) {
                $.ajax({
                    type: "post",
                    url: "https://www.reddit.com/api/v1/access_token",
                    headers: {
                        Authorization: "Basic " + btoa("7q7ZIqo0EGoJPA:W_dxhOX3sSUKe-vGjIB_bnn_y6M")
                    },
                    data: {
                        grant_type: "authorization_code",
                        code: urlHash["code"],
                        redirect_uri: "http://localhost:8080/"
                    },
                    success: function (data) {
                        if (data != null && data.error == null && (localStorage.getItem("oneWordStoriesAccessToken") == null ||
                            JSON.parse(localStorage.getItem("oneWordStoriesAccessToken")).accessToken !=
                            data.access_token)) {

                            localStorage.setItem("oneWordStoriesAccessToken", JSON.stringify({
                                accessToken: data.access_token,
                                timeSet: Math.floor(Date.now() / 1000)
                            }));
                        }
                    },
                    fail: function (e) {
                        console.log(e);
                    }
                });
            }
        }
    }

    render() {
        return (
            <div>
                <NavButtons />
                <Login />
            </div>
        );
    }
}

export default HomePage;