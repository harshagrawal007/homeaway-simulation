import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
//import { CookiesProvider } from 'react-cookie';
import registerServiceWorker from './registerServiceWorker';


import reducer from './store/reducer';

//import createStore from redux
import {createStore} from 'redux';

//import Provider from react-redux
import {Provider} from 'react-redux';

//create a store and pass reducer as an argument
const store = createStore(reducer);

ReactDOM.render(
     //<CookiesProvider>
    <BrowserRouter>
    <Provider store = {store}><App />
    </Provider>
    </BrowserRouter>
    //</CookiesProvider>
, document.getElementById('root'));
registerServiceWorker();
