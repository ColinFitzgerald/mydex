const { ethers } = require('hardhat');
const { expect } = require('chai');

const tokens = (n) => {
  return ethers.utils.parseEther(n.toString())
}

describe('MyDai token contract', () => {
  let myDaiToken

  const name = "Colin's Stable Coin"
  const symbol = 'myDai'
  const totalSupply = tokens(1000000)

  beforeEach(async () => {
    const MyDaiToken = await ethers.getContractFactory('Token')

    myDaiToken = await MyDaiToken.deploy(name, symbol, totalSupply)
  })

  describe('Deployment', () => {

    it('has correct name', async () => {
      expect(await myDaiToken.name()).to.equal(name)
    })

    it('has correct symbol', async () => {
      expect(await myDaiToken.symbol()).to.equal(symbol)
    })

    it('has correct decimals', async () => {
      expect(await myDaiToken.decimals()).to.equal(18)
    })

    it('has correct total supply', async () => {
      expect(await myDaiToken.totalSupply()).to.equal(totalSupply)
    })
  })


})