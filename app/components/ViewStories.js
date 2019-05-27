import React from 'react';
// import * as Snoowrap from 'snoowrap';
import { render } from 'react-dom';
import HomePage from './HomePage';
import StoryList from './StoryList';
import NavButton from './NavButton';

/* Bot code */
// const bot = new Snoowrap({
//     clientId: "uBEtpaz683p79g",
//     clientSecret: "jUzoKHVuYZFQABtmClG4yPIsAGE",
//     username: "oneWordStoryBot68",
//     password: "Cljjcfkp0611"
// });

// bot.config({
//     requestDelay: 2000
// });

// bot.submitSelfpost({
//     subredditName: "oneWordStoriesApp",
//     title: "Testing...",
//     test: "1 2 3..."
// }).then(console.log);

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
            success: function(data) {
                this.setState({
                    posts: data.data.children,
                    before: data.data.before,
                    after: data.data.after
                });
            }.bind(this),
            fail: function(e) {
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
        this.apiRequest("", "");

        $.ajax({
            url: "http://www.reddit.com/api/submit",
            type: "post",
            data: {
                title: "Testing",
                text: "1 2 3...",
                sr: "oneWordStoriesApp",
                kind: "self",
                uh: ""
            }
        });
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