import React from 'react';
import { render } from 'react-dom';
import NavButton from './NavButton';
import HomePage from './HomePage';
import WordInput from './WordInput';
import collectionRef from '../../app';

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

        collectionRef.add({
            title: title,
            story: document.getElementById('inputField').value,
            lastUpdatedAt: date
        });
        document.getElementById('inputField').disabled = true;
        document.getElementById('titleField').disabled = true;
        document.getElementById('submit').disabled = true;
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
            <div>
                <input id="titleField" type="text" placeholder="Enter the title of the story..." ></input>
                <div id="story" className="storyText">{text}</div>
                <WordInput onEnter={this.enter} />
                <button id="submit" onClick={this.enter}>Enter</button>
                <br></br>
                <NavButton onClick={this.deleteLastWord} text="Delete the previous word"/>
                <hr></hr>
                <NavButton onClick={this.back} text="Back"/>
            </div>
        );
    }
}

function isAllWhitespace(word) 
{
    for(var i = 0; i < word.length; i++)
    {
        var myCharCode = word.charCodeAt(i);
    
        if(((myCharCode >  8) && (myCharCode < 14)) ||
            (myCharCode == 32))
        {
            return true;
        }
    }
   
      return false;
}


export default BeginStory;
