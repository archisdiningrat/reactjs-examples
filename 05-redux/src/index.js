import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import counter from './store/reducers/counter';
import results from './store/reducers/results';

const reducers = combineReducers({ ctr: counter, res: results })

const store = createStore(reducers)

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
