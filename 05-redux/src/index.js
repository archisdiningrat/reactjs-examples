import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import counter from './store/reducers/counter';
import results from './store/reducers/results';

const reducers = combineReducers({ ctr: counter, res: results })

const logger = store => {
    return next => {
        return action => {
            console.log('[middleware] Dispatching', action);
            const res = next(action);
            console.log('[middleware] Dispatching', store.getState());
            return res;
        }
    }
}

// REDUX DEV TOOLS
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
