/**
 * @file This file contains the main entry point for our React web application.
 * @author Colin Fitzgerald (@link https://colinfitzgerald.eth/)
 *
 * See @link https://reactjs.org/ for more details and documentation.
 */

// Third party imports.
import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'

// Local application imports.
import {
    loadProvider,
    loadNetwork,
    loadTokens,
    loadExchange, loadAccount
} from '../store/interactions'

// Local application React components.
import Navbar from "./Navbar"
import Markets from "./Markets";

// Local application configuration.
import config from "../config.json"

/**
 * This is our main web application.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function App() {
    // Create a dispatch callback that we will use to store things in our
    // applications Redux state store.
    const dispatch = useDispatch()

    /**
     * This method will load all the necessary Web3 objects and information
     * needed by our application.
     *
     * @returns {Promise<void>}
     */
    const loadBlockchainData = async () => {
        // Get a Web3 provider (connection).
        const provider = loadProvider(dispatch)

        // Get the chain ID of the connected network.
        const chainId = await loadNetwork(dispatch, provider)

        // Ensure that we reload the entire webapp when the chain changes.
        // This will of course force everything to refresh as needed.
        window["ethereum"].on('chainChanged', () => {
            window.location.reload()
        })

        // Ensure we reload the users wallet account when it changes.
        // In addition, when the webapp first loads it will display the 'Connect
        // Wallet' button until the user connects their wallet, triggering this
        // event.
        window["ethereum"].on('accountsChanged', () => {
            // Get account(s) and balance from the browser wallet.
            loadAccount(dispatch, provider)
        })

        // Fetch all the token contract addresses we want to interact
        // with in the webapp and load those contracts.
        const myEthAddress = config[chainId]["myEth"].address
        const myDaiAddress = config[chainId]["myDai"].address
        await loadTokens(dispatch, provider, [myEthAddress, myDaiAddress])

        // Fetch all the application contract addresses we want to interact
        // with in the webapp and load those contracts.
        const exchangeAddress = config[chainId]["myDex"].address
        await loadExchange(dispatch, provider, exchangeAddress)
    }

    /**
     * This method will be called when our application is loaded.
     *
     * See https://reactjs.org/docs/hooks-effect.html
     */
    useEffect(() => {
        void loadBlockchainData()
    })

    // Here we create and return the actual HTML for our web application.
    return (
        <div>
            <Navbar />

            <main className='exchange grid'>
                <section className='exchange__section--left grid'>

                    <Markets />

                    {/* Balance */}

                    {/* Order */}

                </section>
                <section className='exchange__section--right grid'>

                    {/* PriceChart */}

                    {/* Transactions */}

                    {/* Trades */}

                    {/* OrderBook */}

                </section>
            </main>

            {/* Alert */}

        </div>
    );
}
