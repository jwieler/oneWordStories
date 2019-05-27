import React from 'react';

class CompleteStory extends React.Component {
    render() {
        return (
            <div>
                <h3>{this.props.story.data.title}</h3>
            </div>
        );
    }
}

export default CompleteStory;