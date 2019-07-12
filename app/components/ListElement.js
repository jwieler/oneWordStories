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
            yeahed: !(this.props.story.data.likes === null || this.props.story.data.likes != 1),
            unyeahed: !(this.props.story.data.likes === null || this.props.story.data.likes != 0)
        }
    }

    loggedIn() {
        var localStorageItem = localStorage.getItem("oneWordStoriesAccessToken");

        if (localStorageItem === null) {
            return false;
        }

        var accountInfo = JSON.parse(localStorageItem);
        
        if (accountInfo === null || Math.floor(Date.now() / 1000) - accountInfo.timeSet >= 3600) {
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
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var timestamp = new Date(this.props.story.data.created * 1000);
        var year = timestamp.getFullYear();
        var month = months[timestamp.getMonth()];
        var day = timestamp.getDate();

        var styleUp = {
            display: "inline-block",
            margin: "5px",
            verticalAlign: "middle"
        }

        var styleDown = {
            display: "inline-block",
            margin: "5px",
            verticalAlign: "middle",
            transform: "rotate(180)"
        }

        if (!this.loggedIn()) {
            yeahButton = <img style={styleUp} id={this.props.story.data.id + "up"} className="vote" height="20" src="../../images/up-arrow-disabled.svg"/>;
            unyeahButton = <img style={styleDown} id={this.props.story.data.id + "down"} className="vote" height="20" src="../../images/down-arrow-disabled.svg"/>;
        }
        else if (this.state.yeahed) {
            yeahButton = <img style={styleUp} id={this.props.story.data.id + "up"} className="voteActive" onClick={this.yeah} width="20" src="../../images/up-arrow-clicked.svg"/>;
            unyeahButton = <img style={styleDown} id={this.props.story.data.id + "down"} className="voteActive" onClick={this.unyeah} width="20" src="../../images/down-arrow-unclicked.svg"/>;
        }
        else if (this.state.unyeahed) {
            yeahButton = <img style={styleUp} id={this.props.story.data.id + "up"} className="voteActive" onClick={this.yeah} width="20" src="../../images/up-arrow-unclicked.svg"/>;
            unyeahButton = <img style={styleDown} id={this.props.story.data.id + "down"} className="voteActive" onClick={this.unyeah} width="20" src="../../images/down-arrow-clicked.svg"/>;
        }
        else {
            yeahButton = <img style={styleUp} id={this.props.story.data.id + "up"} className="voteActive" onClick={this.yeah} width="20" src="../../images/up-arrow-unclicked.svg"/>;
            unyeahButton = <img style={styleDown} id={this.props.story.data.id + "down"} className="voteActive" onClick={this.unyeah} width="20" src="../../images/down-arrow-unclicked.svg"/>;
        }

        return (
            <li className="story">
                <CompleteStory story={this.props.story} />
                <div>
                    {yeahButton}
                    <p id={this.props.story.data.id + "score"}
                    style = {{
                        color: "#BABABA",
                        display: "inline-block",
                        marginTop: "5px",
                        marginBottom: "5px",
                        verticalAlign: "middle"
                    }}>{this.props.story.data.score}</p>
                    {unyeahButton}
                    <p style={{
                        position: "absolute",
                        right: "10px",
                        bottom: "10px",
                        color: "#BABABA"
                    }}>{month + " " + day + ", " + year}</p>
                </div>
            </li>
        );
    }
}

export default ListElement;