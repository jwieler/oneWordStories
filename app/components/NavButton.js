import React from 'react';

class NavButton extends React.Component {
    render() {
        return <button style = {{
            height: "30px",
            backgroundColor: "transparent",
            borderStyle: "solid",
            borderWidth: "2px",
            color: "whitesmoke",
    }}
     onClick={this.props.onClick}>{this.props.text}</button>;
    }
}

export default NavButton;