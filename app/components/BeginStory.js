import React from 'react';
import { render } from 'react-dom';
import NavButton from './NavButton';
import HomePage from './HomePage';
import collectionRef from '../../app';

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
        this.back = this.back.bind(this);
    }

    pastePrevent(e) {
        e.preventDefault();
    }

    enter() {
        var input = document.getElementById('inputField').value;
        var title = document.getElementById('titleField').value;

        var date = Date.now();
        collectionRef.add({
            title: title,
            story: input,
            lastUpdatedAt: date,
        });
        document.getElementById('inputField').disabled = true;
        document.getElementById('titleField').disabled = true;
        document.getElementById('submit').disabled = true;
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
            document.getElementById('inputField').disabled = true;
        }
        else if (e.key == ' ' && !isAllWhitespace(document.getElementById("inputField").value))
        {
            var input = document.getElementById('inputField').value;
            this.setState ({
                numWords: this.state.numWords + 1,
                word: this.state.word += input + ' ',
            });  
            document.getElementById('inputField').disabled = true;
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
                <hr></hr>
                <div id="story" className="storyText">{text}</div>
                <input id="inputField" type="text" placeholder="Type in a word..." onKeyDown={this.keyDownHandler} onKeyUp={this.keyUpHandler} onPaste={this.pastePrevent}></input>
                <br></br>
                <button id="submit" onClick={this.enter}>Submit</button>
                <br></br>
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
