import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { App } from './App';
import { Store } from './store';

ReactDOM.render(<App store={new Store()} />, document.getElementById('root'));
