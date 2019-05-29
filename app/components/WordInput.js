import React from 'react';

class WordInput extends React.Component {
    constructor(props) {
        super(props)

        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.pastePrevent = this.pastePrevent.bind(this);
    }

    pastePrevent(e) {
        e.preventDefault();
    }

    keyDownHandler(e) {
        if (document.getElementById("inputField").value == "" || isAllWhitespace(document.getElementById("inputField").value) || document.getElementById("inputField").value == " ") {
            return;
        }
        if (e.key == 'Enter') {
            this.props.onEnter();
        }
        else if (e.key == ' ' && !isAllWhitespace(document.getElementById("inputField").value)) {
            this.props.onEnter();
        }
    }

    keyUpHandler(e) {
        if (e.key == ' ') {
            document.getElementById('inputField').value = "";
        }
    }

    render() {
        return (
            <div>
                <input id="inputField" type="text" placeholder="Type in a word..." onKeyDown={this.keyDownHandler} onKeyUp={this.keyUpHandler} onPaste={this.pastePrevent}></input>
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


export default WordInput;
