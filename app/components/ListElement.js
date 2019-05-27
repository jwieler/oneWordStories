import React from 'react';
import CompleteStory from './CompleteStory';

class ListElement extends React.Component {
    render() {
        return (
            <li>
                <CompleteStory story={this.props.story} />
            </li>
        );
    }
}

export default ListElement;