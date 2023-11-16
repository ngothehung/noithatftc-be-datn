// -- React and related libs
import React from 'react';
import { render } from 'react-dom';

// -- Redux
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from 'react-redux';
import reducers from '../src/redux/reducers';

// -- App
import App from './App';

// -- Service Worker
import * as serviceWorker from './serviceWorker';
import { ToastContainer } from 'react-toastify';

// -- Data Store
const store = createStore(
	reducers,
	applyMiddleware( ReduxThunk )
);

// -- Rendering Application
render(
	<Provider store={ store }>
		{/* <ToastContainer /> */}
		<App />
	</Provider>,
	document.getElementById( 'root' )
);
serviceWorker.unregister();

