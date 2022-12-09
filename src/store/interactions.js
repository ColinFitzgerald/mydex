/**
 * @file This file provides all the Redux store interactions for our Web app.
 * @author Colin Fitzgerald (@link https://colinfitzgerald.eth/)
 *
 * For more details and documentation see:
 *   @link https://react-redux.js.org/
 *   @link https://docs.ethers.io
 */

// Third party imports.
import {ethers} from 'ethers'

// Local application imports.
import config from "../config.json";
import TOKEN_ABI from '../abis/Token.json'
// import EXCHANGE_ABI from '../abis/Exchange.json'


/**
 * This function will load the Web3 provider/connection and dispatch it to
 * our Redux store.  A wallet, such at Metamask, is required to expose the
 * 'ethereum' object in the DOM.
 *
 * @param dispatch The React-Redux dispatch callback function.
 * @returns {ethers.providers.Web3Provider} The Web3 provider object.
 */
export const loadProvider = (dispatch) => {
    const connection = new ethers.providers.Web3Provider(window["ethereum"])

    dispatch({type: 'PROVIDER_LOADED', connection})

    return connection
}

/**
 * This function will retrieve the chain ID from the given Web3 provider
 * and dispatch it to our Redux store.
 *
 * @param dispatch The React-Redux dispatch callback function.
 * @param provider The Web3 ethers provider.
 * @returns {Promise<number>} The chain ID of the provider's network.
 */
export const loadNetwork = async (dispatch, provider) => {
    const {chainId} = await provider.getNetwork()

    dispatch({type: 'NETWORK_LOADED', chainId})

    return Number(chainId)
}

/**
 * This function will retrieve the first connected account address from the
 * browser's Web3 wallet and dispatch it to our Redux store.
 *
 * @param dispatch The React-Redux dispatch callback function.
 * @returns {Promise<string>} The wallet's first connected account address.
 */
export const loadAccount = async (dispatch) => {
    const accounts = await window["ethereum"].request({method: 'eth_requestAccounts'})

    const address = ethers.utils.getAddress(accounts[0])

    dispatch({type: 'ACCOUNT_LOADED', address})

    return address
}

/**
 * This function will create a Contract object that we can interact with and
 * dispatch it to our Redux store.
 *
 * @param dispatch The React-Redux dispatch callback function.
 * @param provider The Web3 ethers provider.
 * @param chainId The chain ID of the network the provider is connected to.
 * @returns {Promise<string>} The token contracts symbol.
 */
export const loadToken = async (dispatch, provider, chainId) => {
    const contract = new ethers.Contract(config[chainId]["myDai"].address, TOKEN_ABI, provider)

    const symbol = await contract.symbol()

    dispatch({type: 'TOKEN_LOADED', contract, symbol})

    return symbol
}
