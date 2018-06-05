import React, { Component } from 'react';

class NavBar extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let user = this.props.user;

        return (
            <nav>
                <h1>CAH</h1>
                <p onClick={this.props.loginHandler.bind(null)}>
                    {user.name ? user.name : 'Name'}
                </p>
            </nav>
        );
    }
}

export default NavBar;