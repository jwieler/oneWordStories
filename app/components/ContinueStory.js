import React from 'react';
import { render } from 'react-dom';
import WordInput from './WordInput';
import HomePage from './HomePage';
import bot from './RedditBot';
import collectionRef from '../../app';
import Header from './Header';

class ContinueStory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            story: "",
            lastUpdatedAt: "",
            title: ""
        };

        this.enter = this.enter.bind(this);
        this.back = this.back.bind(this);
        this.endStory = this.endStory.bind(this);
        this.nextStory = this.nextStory.bind(this);
    }

    componentDidMount() {
        collectionRef.orderBy("lastUpdatedAt").get().then(querySnapshot => {
            this.setState({
                id: querySnapshot.docs[0].ref.id,
                story: querySnapshot.docs[0].data().story,
                title: querySnapshot.docs[0].data().title,
                lastUpdatedAt: querySnapshot.docs[0].data().lastUpdatedAt
            });

            collectionRef.doc(this.state.id).set({
                story: querySnapshot.docs[0].data().story,
                title: querySnapshot.docs[0].data().title,
                lastUpdatedAt: Date.now()
            });
        });

        document.getElementById('endStory').disabled = true;
    }

    nextStory() {
        collectionRef.orderBy("lastUpdatedAt").get().then(querySnapshot => {
            this.setState({
                id: querySnapshot.docs[0].ref.id,
                story: querySnapshot.docs[0].data().story,
                title: querySnapshot.docs[0].data().title,
                lastUpdatedAt: querySnapshot.docs[0].data().lastUpdatedAt
            });

            collectionRef.doc(this.state.id).set({
                story: querySnapshot.docs[0].data().story,
                title: querySnapshot.docs[0].data().title,
                lastUpdatedAt: Date.now()
            });
        });

        document.getElementById('endStory').disabled = true;
        document.getElementById('inputField').disabled = false;
    }

    enter() {
        var word = document.getElementById('inputField').value;
        var newStory = this.state.story + " " + word;
        console.log(newStory);
        collectionRef.doc(this.state.id).set({
            story: newStory,
            title: this.state.title,
            lastUpdatedAt: Date.now()
        });
        document.getElementById('inputField').value = null;
        document.getElementById('inputField').disabled = true;
        document.getElementById('story').innerHTML = newStory;
        this.setState({
            id: this.state.id,
            story: newStory,
            title: this.state.title,
            lastUpdatedAt: Date.now()
        });

        document.getElementById('endStory').disabled = false;
    }

    back() {
        render(
            <HomePage />,
            document.getElementById('app')
        );
    }

    endStory() {
        collectionRef.doc(this.state.id).delete();

        bot.submitSelfpost({
            subredditName: "oneWordStoriesApp",
            title: this.state.title,
            text: this.state.story
        });

        document.getElementById('endStory').disabled = true;
    }

    render() {
        return (
            <div style={{
                textAlign: "center"
            }}>
                <Header homePage={false}/>
                <div style={{
                     marginTop: "64px"
                }}>
                    <h1 style = {{
                        color: "whitesmoke",
                        fontSize: "2em",
                        padding: "10px",
                    }}>{this.state.title}</h1>
                    <p style = {{
                        color: "#BABABA",
                        marginBottom: "10px"
                    }} id="story">{this.state.story}</p>
                    <WordInput onEnter={this.enter} />
                    <button id="endStory" onClick={this.endStory}>End Story</button>
                    <button id="nextStory" onClick={this.nextStory}>Next Story</button>
                </div>
            </div>
        );
    }
}

export default ContinueStory;