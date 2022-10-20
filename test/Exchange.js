const {ethers} = require('hardhat');
const {expect} = require('chai');

const tokens = (n) => {
    return ethers.utils.parseEther(n.toString())
}

describe('Exchange contract', () => {
    let exchange,
        accounts,
        deployer,
        feeAccount,
        feePercent,
        user1,
        user2,
        token1,
        token2

    beforeEach(async () => {
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        feeAccount = accounts[1]
        user1 = accounts[2]
        user2 = accounts[3]

        feePercent = 10

        const Exchange = await ethers.getContractFactory('Exchange')

        exchange = await Exchange.deploy(feeAccount.address, feePercent)

        const Token1 = await ethers.getContractFactory('Token')

        token1 = await Token1.deploy('Token 1', 'T1', tokens(1000))

        let transaction = await token1.connect(deployer).transfer(user1.address, tokens(100))
        await transaction.wait()
    })

    describe('Deployment', () => {
        it('tracks the fee account', async () => {
            expect(await exchange.getFeeAccount()).to.equal(feeAccount.address)
        })

        it('tracks the fee percent', async () => {
            expect(await exchange.getFeePercent()).to.equal(feePercent)
        })

    })

    describe('Deposit Token', () => {
        let amount,
            transaction,
            result

        beforeEach(async () => {
            amount = tokens(10)
        })

        describe('Success', () => {
            beforeEach(async () => {
                transaction = await token1.connect(user1).approve(exchange.address, amount)
                result = await transaction.wait()

                transaction = await exchange.connect(user1).depositToken(token1.address, amount)
                result = await transaction.wait()
            })

            it('tracks the token balance', async () => {
                expect(await token1.balanceOf(exchange.address)).to.equal(amount)
                expect(await exchange.tokens(token1.address, user1.address)).to.equal(amount)
                expect(await exchange.balanceOf(token1.address, user1.address)).to.equal(amount)
            })

            it('emits a deposit event', async () => {
                const event = result.events[1]
                expect(event.event).to.equal('Deposit')

                const args = event.args
                expect(args._token).to.equal(token1.address)
                expect(args._user).to.equal(user1.address)
                expect(args._amount).to.equal(amount)
                expect(args._balance).to.equal(amount)
            })

        }) // Success

        describe('Failure', () => {
            it('when no tokens are approved', async () => {
                await expect(exchange.connect(user1).depositToken(token1.address, amount)).to.be.reverted
            })

        }) // Failure

    }) // Deployment

})
