/**
 * @file This file contains the market selection (token pair) for our MyDex Token Exchange application.
 * @author Colin Fitzgerald (@link https://colinfitzgerald.eth/)
 */

// Third party imports.
import {useSelector, useDispatch} from 'react-redux'

// Local application imports.
import {loadTokens} from '../store/interactions'

// Local application configuration.
import config from '../config.json'

const Markets = () => {
    // Create a dispatch callback that we will use to store things in our
    // applications Redux state store.
    const dispatch = useDispatch()

    // Fetch the Web3 provider (connection) and chain ID from our Redux store.
    const provider = useSelector(state => state.provider.connection)
    const chainId = useSelector(state => state.provider.chainId)

    /**
     * This callback method is used to load the tokens associated with this
     * trading pair.
     *
     * @returns {Promise<void>}
     */
    const marketChangedHandler = async (event) => {
        // First fetch the two token addresses from our selection event...
        const tokenAddresses = event.target.value.split(',')

        // ...then (re)load these tokens into the application.
        await loadTokens(dispatch, provider, tokenAddresses)
    }

    // Here we create and return the actual HTML for our component.
    return (
        <div className='component exchange__markets'>
            {/* Display the components title. */}
            <div className='component__header'>
                <h2>Select Market</h2>
            </div>

            {/* If we have a valid chain connected and a chain configuration... */}
            { chainId && config[chainId] ? (
                /* ...we can display the market selection drop down with all supported trading pairs. */
                <select name='markets' id='markets' onChange={marketChangedHandler}>
                    {/* TODO Can we fetch these dynamically from the config file?.. */}
                    <option value={`${config[chainId]['myDApp'].address},${config[chainId]['myEth'].address}`}>myDex / myEth</option>
                    <option value={`${config[chainId]['myDApp'].address},${config[chainId]['myDai'].address}`}>myDex / myDai</option>
                </select>
            ):(
                /* ...or, if not connected or configured just display a warning to the user. */
                <div>
                    <p>Not Deployed to Network</p>
                </div>
            )}
        </div>
    )
}

// Ensure we export the component, so we can use it elsewhere in our application.
export default Markets;
