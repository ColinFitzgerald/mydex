const { ethers } = require('hardhat');
const { expect } = require('chai');

const tokens = (n) => {
    return ethers.utils.parseEther(n.toString())
}

describe('Exchange contract', () => {
    let exchange,
        accounts,
        deployer,
        feeAccount,
        feePercent

    beforeEach(async () => {
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        feeAccount = accounts[1]

        feePercent = 10

        const Exchange = await ethers.getContractFactory('Exchange')

        exchange = await Exchange.deploy(feeAccount.address, feePercent)
    })

    describe('Deployment', () => {
        it('tracks the fee account', async () => {
            expect(await exchange.getFeeAccount()).to.equal(feeAccount.address)
        })

        it('tracks the fee percent', async () => {
            expect(await exchange.getFeePercent()).to.equal(feePercent)
        })

    })
})
