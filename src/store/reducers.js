/**
 * @file This file provides all the Redux reducers for our application.
 * @author Colin Fitzgerald (@link https://colinfitzgerald.eth/)
 *
 * Any actions we dispatch to Redux will be handled here by one of these
 * reducers that will modify the Redux store by returning the updated
 * state as needed.
 *
 * See @link https://redux.js.org/ for more details and documentation.
 */

/**
 * This reducer will handle all actions related to a Web3 provider or
 * connection.
 */
const provider = (state = {}, action) => {
    switch (action.type) {
        case 'PROVIDER_LOADED':
            return {
                ...state,
                connection: action.connection
            }
        case 'NETWORK_LOADED':
            return {
                ...state,
                chainId: action.chainId
            }

        default:
            return state
    }
}

/**
 * This reducer will handle all actions related to our Web3 wallet account.
 */
const account = (state = {}, action) => {
    switch (action.type) {
        case 'ACCOUNT_LOADED':
            return {
                ...state,
                address: action.address
            }

        default:
            return state
    }
}

/**
 * This reducer will handle all actions related to any Web3 token contracts.
 */
const token = (state = {loaded: false, contract: null}, action) => {
    switch (action.type) {
        case 'TOKEN_LOADED':
            return {
                ...state,
                loaded: true,
                contract: action.contract,
                symbol: action.symbol
            }

        default:
            return state
    }
}

// Finally, combine and export all the reducers so the store can use them.
export const reducer = {
    provider,
    account,
    token,
}
