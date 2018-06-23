import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Routes } from './routes.jsx';

import { store } from './redux/store';

const App = () => (
    <Provider store={store}>
        <Routes />
    </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));