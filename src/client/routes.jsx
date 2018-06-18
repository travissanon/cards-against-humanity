import React, { Component } from 'react';
import { 
    BrowserRouter as Router, 
    Switch, 
    Route,
} from "react-router-dom";

import './styles/main.scss';

// Pages
import HomePage from './containers/HomePage.jsx';
import GameView from './containers/GameView.jsx';

// Routes
export const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/lobby/:id" component={GameView} />
        </Switch>
    </Router>
);