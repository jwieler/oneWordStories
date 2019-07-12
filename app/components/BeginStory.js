import React from 'react';
import { render } from 'react-dom';
import NavButton from './NavButton';
import HomePage from './HomePage';
import WordInput from './WordInput';
import collectionRef from '../../app';
import Header from './Header';

class BeginStory extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            numWords: 0,
            word: '',
        };

        this.enter = this.enter.bind(this);
        this.back = this.back.bind(this);
    }

    enter() {
        var title = document.getElementById('titleField').value;

        var date = Date.now();

        if (document.getElementById('inputField').value.length < 1 || title.length < 1) {
            alert("Neither field can be empty, please try again.");
        }
        else {
            collectionRef.add({
                title: title,
                story: document.getElementById('inputField').value,
                lastUpdatedAt: date
            });
            document.getElementById('inputField').disabled = true;
            document.getElementById('titleField').disabled = true;
            document.getElementById('submit').disabled = true; s
        }

    }

    back() {
        render(
            <HomePage />,
            document.getElementById('app')
        );
    }

    render() {
        var text = '';
        text = this.state.word;
        return (
            <div style={{
                textAlign: "center"
            }}>
                <Header homePage={false} />
                <div style={{
                    marginTop: "64px",
                    textAlign: "center",
                    padding: "10px",
                }}>
                    <div style={{
                        display: "inline-block",
                        padding: "10px",
                    }}>
                        <p id="storyBegin" style={{
                            color: "whitesmoke",
                            fontSize: "2rem",
                            padding: "10px",
                        }}>Begin a Story!</p>
                        <input style={{
                            marginBottom: "5px",
                            height: "30px",
                            fontSize: "100%"
                        }} id="titleField" type="text" placeholder="Enter the title of the story..." autoComplete="off"></input>
                        <div id="story" className="storyText">{text}</div>
                        <WordInput onEnter={this.enter} />
                        <button id="submit" onClick={this.enter}>Enter</button>
                    </div>
                </div>
            </div>
        );
    }
}

function isAllWhitespace(word) {
    for (var i = 0; i < word.length; i++) {
        var myCharCode = word.charCodeAt(i);

        if (((myCharCode > 8) && (myCharCode < 14)) ||
            (myCharCode == 32)) {
            return true;
        }
    }

    return false;
}


export default BeginStory;
