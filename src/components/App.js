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
    loadAccount,
    loadToken
} from '../store/interactions'
// import store from "../store/store";

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
        // Get account(s) from the browser wallet.
        await loadAccount(dispatch)

        // Get a Web3 provider (connection).
        const provider = loadProvider(dispatch)

        // Get the chain ID of the connected network.
        const chainId = await loadNetwork(dispatch, provider)

        // Create a token contract to interact with.
        await loadToken(dispatch, provider, chainId)
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

            {/* Navbar */}

            <main className='exchange grid'>
                <section className='exchange__section--left grid'>

                    {/* Markets */}

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
