import React from 'react';
import { render } from 'react-dom';
import StoryList from './StoryList';
import NavButtons from './NavButtons';
import Header from './Header';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            before: "",
            after: "",
        };

        this.getPosts = this.getPosts.bind(this);
        this.changeSort = this.changeSort.bind(this);
    }

    getPosts(beforeStr, afterStr, sort) {
        var accountInfo = JSON.parse(localStorage.getItem("oneWordStoriesAccessToken"));
        var requestUrl = "";
        var header = {};

        if (accountInfo == null || Math.floor(Date.now() / 1000) - accountInfo.timeSet >= 3600) {
            requestUrl = "https://www.reddit.com/r/oneWordStoriesApp/" + sort + ".json";
        }
        else {
            requestUrl = "https://oauth.reddit.com/r/oneWordStoriesApp/" + sort;
            header = {
                Authorization: "bearer " + JSON.parse(localStorage.getItem("oneWordStoriesAccessToken")).accessToken
            };
        }

        $.ajax({
            type: "get",
            url: requestUrl,
            headers: header,
            data: {
                limit: 30,
                before: beforeStr,
                t: sort == "top" ? "all" : "",
                after: afterStr
            },
            success: function (data) {
                this.setState({
                    posts: data.data.children,
                    before: data.data.before,
                    after: data.data.after
                });

                if (accountInfo == null || Math.floor(Date.now() / 1000) - accountInfo.timeSet >= 3600) {
                    $(':button[class="vote"]').prop('disabled', true);
                }
            }.bind(this),
            fail: function (e) {
                console.log(e);
            }
        });
    }

    changeSort() {
        this.getPosts("", "", document.getElementById("sort").value);
    }

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
                        if (data != null && data.error == null && (localStorage.getItem("oneWordStoriesAccessToken") === null ||
                            JSON.parse(localStorage.getItem("oneWordStoriesAccessToken")) === null || JSON.parse(localStorage.getItem("oneWordStoriesAccessToken")).accessToken !=
                            data.access_token)) {

                            localStorage.setItem("oneWordStoriesAccessToken", JSON.stringify({
                                accessToken: data.access_token,
                                timeSet: Math.floor(Date.now() / 1000)
                            }));

                            this.forceUpdate();
                        }
                    }.bind(this),
                    fail: function (e) {
                        console.log(e);
                    },
                    async: false
                });
            }
        }

        this.getPosts("", "", "hot");
    }

    render() {
        return (
            <div style = {{
                textAlign: "center",
            }}>
                <Header homePage={true} />
                <div style={{
                    marginTop: "64px",
                    textAlign: "center",
                }}>
                    <div style = {{
                        display: "inline-block",
                        textAlign: "left",
                        width: "66%",
                        padding: "10px",
                    }}>
                    <NavButtons />
                    <select style = {{
                        backgroundColor: "transparent",
                        color: "whitesmoke",
                    }} id="sort" onChange={this.changeSort}>
                        <option style = {{color: "black", backgroundColor: "transparent"}} value="hot">Hot</option>
                        <option style = {{color: "black", backgroundColor: "transparent"}} value="top">Top</option>
                    </select>
                    <StoryList children={this.state.posts} />
                </div>
                </div>
            </div>
        );
    }
}

export default HomePage;