import React from 'react';

class CompleteStory extends React.Component {
    render() {
        return (
            <div
            style = {{
                fontFamily: "Montserrat",
            }}>
                <h3 style = {{
                    color: "whitesmoke",
                    fontSize: "2em",
                    marginBottom: "10px",
                }}>{this.props.story.data.title}</h3>
                <p style = {{
                    textIndent: "20px",
                    color: "#BABABA",
                }}>{this.props.story.data.selftext}</p>
            </div>
        );
    }
}

export default CompleteStory;