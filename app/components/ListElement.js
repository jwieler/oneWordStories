import React from 'react';
import CompleteStory from './CompleteStory';

class ListElement extends React.Component {
    constructor(props) {
        super(props)

        this.yeah = this.yeah.bind(this);
        this.unyeah = this.unyeah.bind(this);
    }

    yeah() {
        console.log("Yeah");
    }

    unyeah() {
        console.log("Unyeah");
    }

    render() {
        return (
            <li>
                <CompleteStory story={this.props.story} />
                <button className="vote" onClick={this.yeah}>Yeah</button>
                <p>{this.props.story.data.score}</p>
                <button className="vote" onClick={this.unyeah}>Unyeah</button>
            </li>
        );
    }
}

export default ListElement;