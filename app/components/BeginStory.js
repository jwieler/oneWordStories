import React from 'react';
import { render } from 'react-dom';
import NavButton from './NavButton';
import HomePage from './HomePage';
import WordInput from './WordInput';

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

    enter(word) {
        this.setState ({
            numWords: this.state.numWords + 1,
            word: this.state.word += word + " "
        });
        document.getElementById('inputField').value = null;
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
                <div id="story" className="storyText">{text}</div>
                <WordInput onEnter={this.enter} />
                <NavButton onClick={this.enter} text="Enter"/>
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
