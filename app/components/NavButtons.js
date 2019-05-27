import React from 'react';
import { render } from 'react-dom';
import NavButton from './NavButton';
import ViewStories from './ViewStories';
import BeginStory from './BeginStory';

class NavButtons extends React.Component {
    constructor(props) {
        super(props);

        this.beginStory = this.beginStory.bind(this);
        this.continueStory = this.continueStory.bind(this);
        this.viewStories = this.viewStories.bind(this);
    }

    beginStory() {
        render(
            <BeginStory />,
            document.getElementById('app')
        );
    }

    continueStory() {
        console.log("Continue Story");
    }

    viewStories() {
        render(
            <ViewStories />,
            document.getElementById('app')
        );
    }

    render() {
        return (
            <div>
                <NavButton onClick={this.beginStory} text="Begin a Story"/>
                <NavButton onClick={this.continueStory} text="Continue a Story"/>
                <NavButton onClick={this.viewStories} text="View Stories" />
            </div>
        );
    }
}

export default NavButtons;