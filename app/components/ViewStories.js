import React from 'react';
import { render } from 'react-dom';
import HomePage from './HomePage';
import StoryList from './StoryList';
import NavButton from './NavButton';

class ViewStories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            before: "",
            after: "",
        };

        this.getPosts = this.getPosts.bind(this);
        this.back = this.back.bind(this);
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

    back() {
        render(
            <HomePage />,
            document.getElementById('app')
        );
    }

    changeSort() {
        this.getPosts("", "", document.getElementById("sort").value);
    }

    componentDidMount() {
        this.getPosts("", "", "hot");
    }

    render() {
        return (
            <div>
                <NavButton onClick={this.back} text="Back" />
                <select id="sort" onChange={this.changeSort}>
                    <option value="hot">Hot</option>
                    <option value="top">Top</option>
                </select>
                <StoryList children={this.state.posts} />
            </div>
        );
    }
}

export default ViewStories;