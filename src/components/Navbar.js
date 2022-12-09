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
 * This is our main application navigation bar component.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Navbar = () => {
    // Create a dispatch callback that we will use to store things in our
    // applications Redux state store.
    const dispatch = useDispatch()

    // TODO
    const provider = useSelector(state => state.provider.connection)
    const chainId = useSelector(state => state.provider.chainId)

    // TODO
    const accountAddress = useSelector(state => state.account.address)
    const accountBalance = useSelector(state => state.account.balance)

    /**
     *
     *
     * @returns {Promise<void>}
     */
    const connectHandler = async () => {
        // Get account(s) and balance from the browser wallet.
        await loadAccount(dispatch, provider)
    }

    /**
     *
     *
     * @param event
     * @returns {Promise<void>}
     */
    const networkHandler = async (event) => {
        await window['ethereum'].request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: event.target.value }]
        })
    }

    // Here we create and return the actual HTML for our component.
    return (
        <div className='exchange__header grid'>

            {/* TODO */}
            <div className='exchange__header--brand flex'>
                <img src={logo} className='logo' alt='MyDex Logo'/>
                <h1>MyDex Token Exchange</h1>
            </div>

            {/* TODO */}
            <div className='exchange__header--networks flex'>
                <img src={eth} className='eth logo' alt='Eth Logo'/>

                {/* TODO */}
                {chainId && (
                    <select name='networks'
                            id='networks'
                            value={config[chainId] ? `0x${Number(chainId).toString(16)}` : "0"}
                            onChange={networkHandler}>
                        <option value='0' disabled>Select Network</option>
                        <option value='0x7a69'>Local Host</option>
                        <option value='0x5'>Goerli Testnet</option>
                        <option value='0xaa36a7'>Sepolia Testnet</option>
                    </select>
                )}
            </div>

            {/* TODO */}
            <div className='exchange__header--account flex'>
                {/* TODO */}
                {accountBalance ? (
                    <p><small>Balance: </small>{Number(accountBalance).toFixed(4)} ETH</p>
                ):(
                    <p/>
                )}

                {/* TODO */}
                {accountAddress ? (
                    /* TODO */
                    <a
                        /* TODO */
                        href={config[chainId] ? `${config[chainId]['blockExplorerUrl']}/address/${accountAddress}` : '#'}
                        target='_blank'
                        rel='noreferrer'
                    >
                        {/* TODO */}
                        {accountAddress.slice(0, 5) + '...' + accountAddress.slice(-4)}

                        {/* TODO */}
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
                    /* TODO */
                    <button className='button' onClick={connectHandler}>Connect Wallet</button>
                )}
            </div>
        </div>
    )
}

// Ensure we export the component so it can be used elsewhere in our application.
export default Navbar;
