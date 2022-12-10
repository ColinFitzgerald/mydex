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

// Application smart contract ABI's.
import TOKEN_ABI from '../abis/Token.json'
import EXCHANGE_ABI from '../abis/Exchange.json'


/**
 * This function will load the Web3 provider/connection and dispatch it to
 * our Redux store.
 *
 * A wallet, such at Metamask, is required to expose the
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
 * TODO This method could be enhanced to load more then one connected
 *  account if present, but currently it's unknown if this is supported
 *  by any wallets.
 *
 * @param dispatch The React-Redux dispatch callback function.
 * @param provider The Web3 ethers provider.
 * @returns {Promise<string>} The wallet's first connected account address.
 */
export const loadAccount = async (dispatch, provider) => {
    // Fetch any/all connected wallet account addresses...
    const accounts = await window["ethereum"].request({method: 'eth_requestAccounts'})

    // ...then fetch the first one and ensure it is in the correct normalized form...
    const address = ethers.utils.getAddress(accounts[0])

    // ...then save it to our Redux store.
    dispatch({type: 'ACCOUNT_LOADED', address})

    // Next, fetch the Eth balance from the wallet account.  Note this is the
    // native Eth balance and not any ERC-20 token balance(s)...
    const balanceInWei = await provider.getBalance(address)
    const balanceInEth = ethers.utils.formatEther(balanceInWei)

    // ...then save it to our Redux store.
    dispatch({type: 'ACCOUNT_ETH_BALANCE_LOADED', balance: balanceInEth})

    return address
}

/**
 * This function will load the exchange contract that we can interact with
 * and save it to our Redux store.
 *
 * @param dispatch The React-Redux dispatch callback function.
 * @param provider The Web3 ethers provider.
 * @param address The exchange contract address.
 */
export const loadExchange = async (dispatch, provider, address) => {
    // Fetch and load the contract...
    const contract = new ethers.Contract(address, EXCHANGE_ABI, provider)

    // ...then save it to our Redux store.
    dispatch({type: 'EXCHANGE_LOADED', contract })
}

/**
 * This function will load the token contracts that we can interact with
 * and save them to our Redux store.  Note that these contracts should
 * expose the ERC-20 token standard interface.
 *
 * TODO Enhance this method so it can load any number of token contracts
 *  as needed.  Currently its limited to just two..
 *
 * @param dispatch The React-Redux dispatch callback function.
 * @param provider The Web3 ethers provider.
 * @param addresses An array of token contract addresses.
 */
export const loadTokens = async (dispatch, provider, addresses) => {
    let contract
    let symbol

    // Fetch and load the token contract, and it's symbol...
    contract = new ethers.Contract(addresses[0], TOKEN_ABI, provider)
    symbol = await contract.symbol()

    // ...then save it to our Redux store.
    dispatch({type: 'TOKEN_1_LOADED', contract, symbol })

    // Fetch and load the token contract, and it's symbol...
    contract = new ethers.Contract(addresses[1], TOKEN_ABI, provider)
    symbol = await contract.symbol()

    // ...then save it to our Redux store.
    dispatch({type: 'TOKEN_2_LOADED', contract, symbol })
}
