/**
 * @file This file provides the Redux store for our application.
 * @author Colin Fitzgerald (@link https://colinfitzgerald.eth/)
 *
 * This is the boilerplate code needed to set up and initialize a Redux
 * store for our application.  In addition, we import the combined
 * reducers that will interact with this store.
 *
 * For more details and documentation see:
 *   @link https://redux.js.org/
 *   @link https://redux-toolkit.js.org/
 */

// Third party imports.
import {configureStore} from '@reduxjs/toolkit'

// Local application imports.
import {reducer} from './reducers'

/**
 * Here we create our Redux store using the recommended Redux Toolkit method.
 *
 * Note that some Web3 items we're trying to put in here generate errors from
 * the default middleware checking for serializability and immutability.
 * This is probably ok, but we need to tell the middleware to ignore these
 * items.
 */
export const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['PROVIDER_LOADED', 'TOKEN_1_LOADED', 'TOKEN_2_LOADED', 'EXCHANGE_LOADED'],
            ignoredPaths: ['provider.connection', 'tokens.contracts', 'exchange.contract'],
        },
        immutableCheck: {
            ignoredPaths: ['provider.connection', 'tokens.contracts', 'exchange.contract'],
        },
    }),
})

// Finally, export the Redux store so out web application can use it.
export default store
