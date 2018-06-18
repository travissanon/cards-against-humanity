import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './styles/main.scss';

// Pages
import HomePage from './pages/HomePage.jsx';
import GameView from './pages/GameView.jsx';

// Routes
const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/test" component={GameView} />
        </Switch>
    </Router>
);

ReactDOM.render(<Routes />, document.getElementById('app'));