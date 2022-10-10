const { ethers } = require('hardhat');
const { expect } = require('chai');

const tokens = (n) => {
  return ethers.utils.parseEther(n.toString())
}

describe('MyDai token contract', () => {
  let myDaiToken

  beforeEach(async () => {
    const MyDaiToken = await ethers.getContractFactory('MyDaiToken')

    myDaiToken = await MyDaiToken.deploy()
  })

  it('has correct name', async () => {
    expect(await myDaiToken.name()).to.equal('Colin\'s Stable Coin')
  })

  it('has correct symbol', async () => {
    expect(await myDaiToken.symbol()).to.equal('myDai')
  })

  it('has correct decimals', async () => {
    expect(await myDaiToken.decimals()).to.equal(18)
  })

  it('has correct total supply', async () => {
    expect(await myDaiToken.totalSupply()).to.equal(tokens('1000000'))
  })

})