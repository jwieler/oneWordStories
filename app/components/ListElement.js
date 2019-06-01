import React from 'react';
import CompleteStory from './CompleteStory';

class ListElement extends React.Component {
    constructor(props) {
        super(props)

        this.yeah = this.yeah.bind(this);
        this.unyeah = this.unyeah.bind(this);
        this.vote = this.vote.bind(this);

        this.state = {
            yeahed: this.props.story.data.likes == null ? false : this.props.story.data.likes,
            unyeahed: this.props.story.data.likes == null ? false : !this.props.story.data.likes
        }
    }

    vote(direction) {
        $.ajax({
            type: "post",
            url: "https://oauth.reddit.com/api/vote",
            headers: {
                authorization: "Bearer " + JSON.parse(localStorage.getItem("oneWordStoriesAccessToken")).accessToken
            },
            data: {
                id: this.props.story.data.name,
                dir: direction.toString()
            },
            success: function(data) {
                console.log(data);
            },
            fail: function(e) {
                console.log(e);
            }
        })
    }

    yeah() {
        if (!this.state.yeahed) {
            if (this.state.unyeahed) {
                document.getElementById(this.props.story.data.id + "score").innerText = parseInt(document.getElementById(this.props.story.data.id + "score").innerText) + 2;
            }
            else {
                document.getElementById(this.props.story.data.id + "score").innerText = parseInt(document.getElementById(this.props.story.data.id + "score").innerText) + 1;
            }

            this.setState({
                yeahed: true,
                unyeahed: false
            });

            this.vote(1);
        }
        else {
            document.getElementById(this.props.story.data.id + "score").innerText = parseInt(document.getElementById(this.props.story.data.id + "score").innerText) - 1;

            this.setState({
                yeahed: false,
                unyeahed: false
            });

            this.vote(0);
        }
    }

    unyeah() {
        if (!this.state.unyeahed) {
            if (this.state.yeahed) {
                document.getElementById(this.props.story.data.id + "score").innerText = parseInt(document.getElementById(this.props.story.data.id + "score").innerText) - 2;
            }
            else {
                document.getElementById(this.props.story.data.id + "score").innerText = parseInt(document.getElementById(this.props.story.data.id + "score").innerText) - 1;
            }

            this.setState({
                yeahed: false,
                unyeahed: true
            });

            this.vote(-1);
        }
        else {
            document.getElementById(this.props.story.data.id + "score").innerText = parseInt(document.getElementById(this.props.story.data.id + "score").innerText) + 1;

            this.setState({
                yeahed: false,
                unyeahed: false
            });

            this.vote(0);
        }
    }

    render() {
        return (
            <li>
                <CompleteStory story={this.props.story} />
                <button id={this.props.story.data.id + "up"} className="vote" onClick={this.yeah}>Yeah</button>
                <p id={this.props.story.data.id + "score"}>{this.props.story.data.score}</p>
                <button id={this.props.story.data.id + "down"} className="vote" onClick={this.unyeah}>Unyeah</button>
            </li>
        );
    }
}

export default ListElement;