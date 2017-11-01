import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Gallery from "./gallery.js";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Gallery />, document.getElementById('root'));
registerServiceWorker();
