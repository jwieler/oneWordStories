import React from 'react';
import { render } from 'react-dom';
import NavButton from './NavButton';
import WordInput from './WordInput';
import HomePage from './HomePage';
import bot from './RedditBot';
import collectionRef from '../../app';

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
      /*  this.setState({
            id: this.state.id,
            story: newStory,
            title: this.state.story,
            lastUpdatedAt: Date.now()
        });
        */
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
        }).then(render(
            <ContinueStory />,
            document.getElementById('app')
        ));
    }

    render() {
        return (
            <div>
                <NavButton onClick={this.back} text="Back" />
                <h1>{this.state.title}</h1>
                <p id="story">{this.state.story}</p>
                <WordInput onEnter={this.enter} />
                <button id="endStory" onClick={this.endStory}>End Story</button>
            </div>
        );
    }
}

export default ContinueStory;