import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './styles/main.scss';

// Pages
import HomePage from './pages/HomePage.jsx';

// Routes
const Routes = () => (
    <Router>
        <Route exact path="/" component={HomePage} />
    </Router>
);

ReactDOM.render(<Routes />, document.getElementById('app'));