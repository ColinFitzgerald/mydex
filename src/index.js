/**
 * @file This file contains the main entry point for our React website.
 * @author Colin Fitzgerald (@link https://colinfitzgerald.eth/)
 *
 * See @link https://reactjs.org/ for more details and documentation.
 */

// Third party imports.
import React from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'

// Local application imports.
import './App.css'
import App from './components/App'
import store from './store/store'

// Get the root element from the DOM...
const root = createRoot(document.getElementById('root'))

// ...and use it to render our application.
root.render(
    // Here we wrap our application with the React Redux <Provider> component
    // making the Redux store available so that any nested components that need
    // to access the Redux store can do so.
    <Provider store={store}>
        <App/>
    </Provider>
)
