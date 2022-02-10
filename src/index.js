import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import reducer from './reducers';

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename = "/Kanban_PLSchool">
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);