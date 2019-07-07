import React from 'react';
import ListElement from './ListElement';

class StoryList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            storyList: []
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.children != this.props.children) {
            this.setState({
                storyList: this.props.children.map((story) =>
                    <ListElement key={story.data.id} story={story} />
                )
            });
        }
    }

    render() {
        return (
            <ul>
                {this.state.storyList}
            </ul>
        );
    }
}

export default StoryList;