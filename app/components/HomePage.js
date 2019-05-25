import React from 'react';
import NavButtons from './NavButtons';
import Login from './Login'

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <NavButtons />
                <Login />
            </div>
        );
    }
}

export default HomePage;