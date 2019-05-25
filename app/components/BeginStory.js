import React from 'react';
import { render } from 'react-dom';
import NavButton from './NavButton';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

class BeginStory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            numWords: 0,
            word: '',
        };
        this.enter = this.enter.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
    }

    enter() {
        var penis = document.getElementById('inputField').value;
        console.log(penis);
        this.setState ({
            numWords: this.state.numWords + 1,
            word: this.state.word += penis + " "
        });
    }

    changeHandler() {
        var penis = document.getElementById('inputField').value;
        if(penis[penis.length - 1] == ' ')
        {
            console.log("Is a space");
        }
        else 
        {
            console.log("Gangnam style, not a space");
        }
    }

    keyDownHandler(e) {
        if(e.key == 'Enter' || e.key == ' ')
        {
            var penis = document.getElementById('inputField').value;
            console.log(penis);
            this.setState ({
                numWords: this.state.numWords + 1,
                word: this.state.word += penis + " "
            });  
            document.getElementById('inputField').value = null;
        }
    }

    render() {
        var text = '';
        text = this.state.word;
        return (
            <div>
               
                <div className="storyText">{text}</div>
                <input id="inputField" type="text" onKeyDown={this.keyDownHandler}></input>
                <NavButton onClick={this.enter} text="Enter"/>
                <br></br>
                <NavButton onClick={this.deleteLastWord} text="Delete the previous word"/>
            </div>
        );
    }
}

export default BeginStory;