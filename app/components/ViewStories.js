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

        this.apiRequest = this.apiRequest.bind(this);
        this.back = this.back.bind(this);
    }

    apiRequest(beforeStr, afterStr) {
        $.ajax({
            type: "get",
            url: "http://www.reddit.com/r/oneWordStoriesApp.json",
            data: {
                limit: 30,
                before: beforeStr,
                after: afterStr
            },
            success: function (data) {
                this.setState({
                    posts: data.data.children,
                    before: data.data.before,
                    after: data.data.after
                });

                var accountInfo = JSON.parse(localStorage.getItem("oneWordStoriesAccessToken"));

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

    componentDidMount() {
        this.apiRequest("", "")
    }

    render() {
        return (
            <div>
                <NavButton onClick={this.back} text="Back" />
                <StoryList children={this.state.posts} />
            </div>
        );
    }
}

export default ViewStories;