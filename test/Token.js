const { ethers } = require('hardhat');
const { expect } = require('chai');

const tokens = (n) => {
  return ethers.utils.parseEther(n.toString())
}

describe('MyDai token contract', () => {
  let token

  const name = "Colin's Stable Coin"
  const symbol = 'myDai'
  const totalSupply = tokens(1000000)

  let accounts
  let deployer
  let sender
  let recipient
  let exchange

  beforeEach(async () => {
    const Token = await ethers.getContractFactory('Token')

    token = await Token.deploy(name, symbol, totalSupply)

    accounts = await ethers.getSigners()
    deployer = accounts[0]
    sender   = deployer
    recipient = accounts[1]
    exchange = accounts[2]
  })

  describe('Deployment', () => {
    it('has correct name', async () => {
      expect(await token.name()).to.equal(name)
    })

    it('has correct symbol', async () => {
      expect(await token.symbol()).to.equal(symbol)
    })

    it('has correct decimals', async () => {
      expect(await token.decimals()).to.equal(18)
    })

    it('has correct total supply', async () => {
      expect(await token.totalSupply()).to.equal(totalSupply)
    })

    it('has assigned all tokens to deployer', async () => {
      expect(await token.totalSupply()).to.equal(await token.balanceOf(deployer.address))
    })
  })

  describe('Token Transfer', () => {
    let amount,
        initial_balance,
        transaction,
        result

    describe('Success', () => {
      beforeEach(async () => {
        amount = tokens(100)

        initial_balance = await token.balanceOf(sender.address)

        transaction = await token.connect(sender).transfer(recipient.address, amount)
        result = await transaction.wait()
      })

      it('results in correct balances', async () => {
        //expect(result).to.equal('ok')

        expect(await token.balanceOf(sender.address)).to.equal(initial_balance.sub(amount))
        expect(await token.balanceOf(recipient.address)).to.equal(amount)
      })

      it('emits a transfer event', async () => {
        const event = result.events[0]
        expect(event.event).to.equal('Transfer')

        const args = event.args
        expect(args._from).to.equal(sender.address)
        expect(args._to).to.equal(recipient.address)
        expect(args._value).to.equal(amount)
      })
    }) // Success

    describe('Failure', () => {
      it('results from sender not having a sufficient balance', async () => {
        initial_balance = await token.balanceOf(sender.address)

        amount = initial_balance + tokens(1)

        await expect(token.connect(sender).transfer(recipient.address, amount)).to.be.reverted
      })

      it('results from and invalid recipient', async () => {
        amount = tokens(1)
        await expect(token.connect(sender).transfer('0x0000000000000000000000000000000000000000', amount)).to.be.reverted
      })
    }) // Failure
  }) // Token Transfer

  describe('Token Approval', () => {
    let amount,
        transaction,
        result

    describe('Success', () => {
      beforeEach(async () => {
        amount = tokens(100)

        transaction = await token.connect(sender).approve(exchange.address, amount)
        result = await transaction.wait()
      })

      it('allocates and allowance for token spending', async () => {
        expect(await token.allowance(sender.address, exchange.address)).to.equal(amount)
      })

      it ('emits a approval event', async () => {
        const event = result.events[0]
        expect(event.event).to.equal('Approval')

        const args = event.args
        expect(args._owner).to.equal(sender.address)
        expect(args._spender).to.equal(exchange.address)
        expect(args._value).to.equal(amount)
      })
    }) // Success

    describe('Failure', () => {
      it('results from and invalid spender', async () => {
        amount = tokens(1)
        await expect(token.connect(sender).approve('0x0000000000000000000000000000000000000000', amount)).to.be.reverted
      })
    }) // Failure
  }) // Token Approval

  describe('Delegated Token Transfer', () => {
    let amount,
        initial_balance,
        transaction,
        result

    beforeEach(async () => {
      amount = tokens(100)

      initial_balance = await token.balanceOf(sender.address)

      transaction = await token.connect(sender).approve(exchange.address, amount)
      result = await transaction.wait()
    })

    describe('Success', () => {
      beforeEach(async () => {
        transaction = await token.connect(exchange).transferFrom(sender.address, recipient.address, amount)
        result = await transaction.wait()
      })

      it('results in correct balances', async () => {
        expect(await token.balanceOf(sender.address)).to.equal(initial_balance.sub(amount))
        expect(await token.balanceOf(recipient.address)).to.equal(amount)
      })

      it('reduces the allowance as needed', async () => {
        expect(await token.allowance(sender.address, exchange.address)).to.equal(0)
      })

      it('emits a transfer event', async () => {
        const event = result.events[0]
        expect(event.event).to.equal('Transfer')

        const args = event.args
        expect(args._from).to.equal(sender.address)
        expect(args._to).to.equal(recipient.address)
        expect(args._value).to.equal(amount)
      })
    }) // Success

    describe('Failure', () => {
      it('results from sender not having a sufficient balance', async () => {
        initial_balance = await token.balanceOf(sender.address)

        amount = initial_balance + tokens(1)

        await expect(token.connect(exchange).transferFrom(sender.address, recipient.address, amount)).to.be.reverted
      })
    }) // Failure
  }) // Delegated Token Transfer
}) // MyDai token contract