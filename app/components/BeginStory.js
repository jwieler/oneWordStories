import React from 'react';
import { render } from 'react-dom';
import NavButton from './NavButton';
import NavButtons from './NavButtons';
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
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.deleteLastWord = this.deleteLastWord.bind(this);
        this.pastePrevent = this.pastePrevent.bind(this);
        this.navButtons = this.navButtons.bind(this);
        this.connect = this.connect.bind(this);
    }

    pastePrevent(e) {
        e.preventDefault();
    }

    enter() {
        var input = document.getElementById('inputField').value;
        this.setState ({
            numWords: this.state.numWords + 1,
            word: this.state.word += input + " "
        });
        document.getElementById('inputField').value = null;
    }

    keyDownHandler(e) { 
        if(document.getElementById("inputField").value == "" || isAllWhitespace(document.getElementById("inputField").value) || document.getElementById("inputField").value == " ")
        {
            return;
        }
        if(e.key == 'Enter')
        {
            var input = document.getElementById('inputField').value;
            this.setState ({
                numWords: this.state.numWords + 1,
                word: this.state.word += input + ' ',
            });  
            document.getElementById('inputField').value = "";
        }
        else if (e.key == ' ' && !isAllWhitespace(document.getElementById("inputField").value))
        {
            var input = document.getElementById('inputField').value;
            this.setState ({
                numWords: this.state.numWords + 1,
                word: this.state.word += input + ' ',
            });  
            document.getElementById('inputField').value = "";
            
        }
    }

    keyUpHandler(e) {
        if(e.key == ' ')
        {
            document.getElementById('inputField').value = "";
        }
    }
    deleteLastWord() {
        var story = document.getElementById("story").innerHTML;
        var words = story.split(" ");  
        var text = "";
        for(var i = 0; i < words.length - 2; i++)
        {
            text += words[i] + ' ';
        }
        this.setState ({
            numWords: this.state.numWords - 1,
            word: text,
        });
    }

    navButtons() {
        render(
            <NavButtons />,
            document.getElementById('app')
        );
    }

    connect() {

    }

    render() {
        var text = '';
        text = this.state.word;
        return (
            <div>
               
                <div id="story" className="storyText">{text}</div>
                <input id="inputField" type="text" placeholder="Type in a word..." onKeyDown={this.keyDownHandler} onKeyUp={this.keyUpHandler} onPaste={this.pastePrevent}></input>
                <NavButton onClick={this.enter} text="Enter"/>
                <br></br>
                <NavButton onClick={this.deleteLastWord} text="Delete the previous word"/>
                <hr></hr>
                <NavButton onClick={this.navButtons} text="Back"/>
                <NavButton onClick={this.connect} text="connect"/>
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