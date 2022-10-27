import React, { useEffect } from 'react';
import '../App.css';
import { ethers } from 'ethers';
import TOKEN_ABI from '../abis/Token.json';
import EXCHANGE_ABI from '../abis/Exchange.json';
import config from '../config.json'


function App() {

    const loadBlockchainData = async () => {
        // Get account(s) from the browser wallet.
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'})
        console.log(accounts[0])

        // Connect to the blockchain via the browser wallet.
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const { chainId } = await provider.getNetwork()
        console.log(chainId)

        console.log(config[chainId].myDai.address)
        // Create a token contract to interact with.
        const token = new ethers.Contract('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', TOKEN_ABI, provider)
        console.log(token.address)
        const symbol = await token.symbol()
        console.log(symbol)
    }

    useEffect(() => {
        loadBlockchainData()

    })

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

export default App;