import React from 'react';

class CompleteStory extends React.Component {
    render() {
        return (
            <div>
                <h3>{this.props.story.data.title}</h3>
                <p>{this.props.story.data.selftext}</p>
            </div>
        );
    }
}

export default CompleteStory;