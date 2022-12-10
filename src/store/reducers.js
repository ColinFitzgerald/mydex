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

        case 'ACCOUNT_ETH_BALANCE_LOADED':
            return {
                ...state,
                balance: action.balance
            }

        default:
            return state
    }
}


/**
 * This reducer will handle all actions related to our Web3 exchange contract.
 */
const exchange = (state = {loaded: false}, action) => {
    switch (action.type) {
        case 'EXCHANGE_LOADED':
            return {
                ...state,
                loaded: true,
                contract: action.contract,
            }

        default:
            return state
    }
}

// Define the starting (empty) state of the tokens so that we have this
// basic structure available vs just it being totally empty.
const DEFAULT_TOKENS_STATE = {
    loaded: false,
    contracts: [],
    symbols: []
}

/**
 * This reducer will handle all actions related to our Web3 token contracts.
 */
const tokens = (state = DEFAULT_TOKENS_STATE, action) => {
    switch (action.type) {
        case 'TOKEN_1_LOADED':
            // Ensure we overwrite any previously loaded tokens when loading
            // the first token as we only ever want a pair of tokens loaded.
            return {
                ...state,
                loaded: true,
                contracts: [action.contract],
                symbols: [action.symbol]
            }

        case 'TOKEN_2_LOADED':
            // When loading the second token we need to ensure we are
            // appending this second token to the first token loaded.
            return {
                ...state,
                loaded: true,
                contracts: [...state.contracts, action.contract],
                symbols: [...state.symbols, action.symbol]
            }

        default:
            return state
    }
}

// Finally, combine and export all the reducers so the store can use them.
export const reducer = {
    provider,
    account,
    exchange,
    tokens: tokens,
}
