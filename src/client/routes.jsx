import React from 'react';
import { 
    BrowserRouter as Router, 
    Switch, 
    Route,
} from "react-router-dom";
import io from 'socket.io-client';

import config from '../../config';

import './styles/main.scss';

// Pages
import HomePage from './containers/HomePage.jsx';
import GameView from './containers/GameView.jsx';

const socket = io(config.serverAddress);

// Send commands from console
if (config.debug) {
    window.sendCommand = (action, args) => {
        socket.emit(action, args);
    };
}

// Routes
export const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" render={routeProps => <HomePage {...routeProps} socket={socket} />} />
            <Route exact path="/lobby/:id" render={routeProps => <GameView {...routeProps} socket={socket} />} />
        </Switch>
    </Router>
);