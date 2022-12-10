/**
 * @file This file contains the navigation bar for our React web application.
 * @author Colin Fitzgerald (@link https://colinfitzgerald.eth/)
 */

// Third party imports.
import {useSelector, useDispatch} from 'react-redux'
import Blockies from 'react-blockies'

// Local application imports.
import {loadAccount} from '../store/interactions'

// Local application configuration.
import config from '../config.json'

// Local application image assets.
import eth from '../assets/eth.svg'
import logo from '../assets/logo.png'

/**
 * This is our applications main navigation bar component.
 *
 * It contains the browser wallet connect feature, display of account address
 * and Eth balance, redirect to blockchain explorer link and a chain selection
 * dropdown and finally the applications logo and title.
 *
 * TODO The 'react-blockies' package seems very outdated, with bugs and no longer
 *  maintained, so we should consider finding an alternative or perhaps forking
 *  and updating the package.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Navbar = () => {
    // Create a dispatch callback that we will use to store things in our
    // applications Redux state store.
    const dispatch = useDispatch()

    // Fetch the Web3 provider (connection) and chain ID from our Redux store.
    const provider = useSelector(state => state.provider.connection)
    const chainId = useSelector(state => state.provider.chainId)

    // Fetch the connected wallet and its balance from our Redux store.
    // If no wallet is connected that is fine as these will be null and handled
    // correctly by this component.
    const accountAddress = useSelector(state => state.account.address)
    const accountBalance = useSelector(state => state.account.balance)

    /**
     * This callback method is used to load the wallet account when the
     * user presses the 'Connect Wallet' button.
     *
     * @returns {Promise<void>}
     */
    const connectWalletHandler = async () => {
        // Get account(s) and balance from the browser wallet.
        await loadAccount(dispatch, provider)
    }

    /**
     * This callback method is used to load the new Ethereum chain when the
     * user selects a new chain from the chain selection component.
     *
     * @param event The event from the selection component (combo box).
     * @returns {Promise<void>}
     */
    const switchChainHandler = async (event) => {
        // Request a chain switch from the browsers Ethereum client.
        await window['ethereum'].request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: event.target.value }]
        })
    }

    // Here we create and return the actual HTML for our component.
    return (
        <div className='exchange__header grid'>

            {/* Display the applications logo and title. */}
            <div className='exchange__header--brand flex'>
                <img src={logo} className='logo' alt='MyDex Logo'/>
                <h1>MyDex Token Exchange</h1>
            </div>

            {/* Display the chain selection dropdown combo box and Ethereum logo. */}
            <div className='exchange__header--networks flex'>
                <img src={eth} className='eth logo' alt='Eth Logo'/>

                {/* The select component with all supported chains and their associated chain ID. */}
                {chainId && (
                    <select name='networks'
                            id='networks'
                            value={config[chainId] ? `0x${Number(chainId).toString(16)}` : "0"}
                            onChange={switchChainHandler}>
                        <option value='0' disabled>Select Chain</option>
                        {/* TODO Can we fetch these dynamically from the config file?.. */}
                        <option value='0x7a69'>Local Host</option>
                        <option value='0x5'>Goerli Testnet</option>
                        <option value='0xaa36a7'>Sepolia Testnet</option>
                    </select>
                )}
            </div>

            {/* Display either the wallet connect button OR the connected wallets address, Eth balance and avatar. */}
            <div className='exchange__header--account flex'>
                {/* If the wallets Eth balance is available... */}
                {accountBalance ? (
                    /* ... display it formatted similar to Metamask. */
                    <p><small>Balance: </small>{Number(accountBalance).toFixed(4)} ETH</p>
                ):(
                    <p/>
                )}

                {/* If the wallet is available and is connected... */}
                {accountAddress ? (
                    /* ...create a link... */
                    <a
                        /* ...to the wallet on the selected chain's block explorer... */
                        href={config[chainId] ? `${config[chainId]['blockExplorerUrl']}/address/${accountAddress}` : '#'}
                        target='_blank'
                        rel='noreferrer'
                    >
                        {/* ...and display its address formatted similar to Metamask... */}
                        {accountAddress.slice(0, 5) + '...' + accountAddress.slice(-4)}

                        {/* ...and display the accounts Blockie avatar. */}
                        <Blockies
                            seed={accountAddress}
                            size={10}
                            scale={3}
                            color='#2187D0'
                            gbColor='#F1F2F9'
                            spotColor='#767F92'
                            className='identicon'
                        />
                    </a>
                ):(
                    /* If the wallet is not available and is not connected then display
                       the wallet connect button. */
                    <button className='button' onClick={connectWalletHandler}>Connect Wallet</button>
                )}
            </div>
        </div>
    )
}

// Ensure we export the component, so we can use it elsewhere in our application.
export default Navbar;
