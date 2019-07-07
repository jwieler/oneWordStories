import React from 'react';
import { render } from 'react-dom';
import NavButton from './NavButton';
import BeginStory from './BeginStory';
import ContinueStory from './ContinueStory';

class NavButtons extends React.Component {
    constructor(props) {
        super(props);

        this.beginStory = this.beginStory.bind(this);
        this.continueStory = this.continueStory.bind(this);
    }

    beginStory() {
        render(
            <BeginStory />,
            document.getElementById('app')
        );
    }

    continueStory() {
        render(
            <ContinueStory />,
            document.getElementById('app')
        );
    }

    render() {
        return (
            <div>
                <NavButton onClick={this.beginStory} text="Begin a Story"/>
                <NavButton onClick={this.continueStory} text="Continue a Story"/>
            </div>
        );
    }
}

export default NavButtons;