import React from 'react';
import CompleteStory from './CompleteStory';

class ListElement extends React.Component {
    constructor(props) {
        super(props)

        this.yeah = this.yeah.bind(this);
        this.unyeah = this.unyeah.bind(this);
        this.loggedIn = this.loggedIn.bind(this);
        this.vote = this.vote.bind(this);

        this.state = {
            yeahed: this.props.story.data.likes === null ? false : this.props.story.data.likes,
            unyeahed: this.props.story.data.likes === null ? false : !this.props.story.data.likes
        }
    }

    loggedIn() {
        var accountInfo = JSON.parse(localStorage.getItem("oneWordStoriesAccessToken"));
        
        if (accountInfo == null || Math.floor(Date.now() / 1000) - accountInfo.timeSet >= 3600) {
            return false;
        }

        return true
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
                if (direction == 1) {
                    this.setState({
                        yeahed: true,
                        unyeahed: false
                    });
                }
                else if (direction == -1) {
                    this.setState({
                        yeahed: false,
                        unyeahed: true
                    });
                }
                else {
                    this.setState({
                        yeahed: false,
                        unyeahed: false
                    });
                }
            }.bind(this),
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

            this.vote(1);
        }
        else {
            document.getElementById(this.props.story.data.id + "score").innerText = parseInt(document.getElementById(this.props.story.data.id + "score").innerText) - 1;

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

            this.vote(-1);
        }
        else {
            document.getElementById(this.props.story.data.id + "score").innerText = parseInt(document.getElementById(this.props.story.data.id + "score").innerText) + 1;

            this.vote(0);
        }
    }

    render() {
        var yeahButton = <img src="#"/>;
        var unyeahButton = <img src="#"/>;

        if (!this.loggedIn()) {
            yeahButton = <img id={this.props.story.data.id + "up"} className="vote" width="20" onClick={this.yeah} src="../../images/up-arrow-disabled.svg"/>;
            unyeahButton = <img id={this.props.story.data.id + "down"} className="vote" onClick={this.unyeah} width="20" src="../../images/down-arrow-disabled.svg"/>;
        }
        else if (this.state.yeahed) {
            yeahButton = <img id={this.props.story.data.id + "up"} className="vote" onClick={this.yeah} width="20" src="../../images/up-arrow-clicked.svg"/>;
            unyeahButton = <img id={this.props.story.data.id + "down"} className="vote" onClick={this.unyeah} width="20" src="../../images/down-arrow-unclicked.svg"/>;
        }
        else if (this.state.unyeahed) {
            yeahButton = <img id={this.props.story.data.id + "up"} className="vote" onClick={this.yeah} width="20" src="../../images/up-arrow-unclicked.svg"/>;
            unyeahButton = <img id={this.props.story.data.id + "down"} className="vote" onClick={this.unyeah} width="20" src="../../images/down-arrow-clicked.svg"/>;
        }
        else {
            yeahButton = <img id={this.props.story.data.id + "up"} className="vote" onClick={this.yeah} width="20" src="../../images/up-arrow-unclicked.svg"/>;
            unyeahButton = <img id={this.props.story.data.id + "down"} className="vote" onClick={this.unyeah} width="20" src="../../images/down-arrow-unclicked.svg"/>;
        }

        return (
            <li style = {{
                borderStyle: "solid",
                borderWidth: "5px",
                borderRadius: "10px",
                marginBottom: "5px",
                marginTop: "10px",
                padding: "10px",
            }}>
                <CompleteStory story={this.props.story} />
                {yeahButton}
                <p id={this.props.story.data.id + "score"}
                style = {{
                    color: "#BABABA",
                    marginTop: "5px",
                    marginBottom: "5px",
                }}>{this.props.story.data.score}</p>
                {unyeahButton}
            </li>
        );
    }
}

export default ListElement;