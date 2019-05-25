import React from 'react';
import NavButton from './NavButton';

class NavButtons extends React.Component {
    constructor(props) {
        super(props)

        this.beginStory = this.beginStory.bind(this)
        this.continueStory = this.continueStory.bind(this)
        this.viewStories = this.viewStories.bind(this)
    }

    beginStory() {
        console.log("Begin Story")
    }

    continueStory() {
        console.log("Continue Story")
    }

    viewStories() {
        console.log("View Stories")
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