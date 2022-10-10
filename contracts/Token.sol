// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MyDaiToken {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    constructor() {
        name = "Colin's Stable Coin";
        symbol = "myDai";
        decimals = 18;
        totalSupply = 1000000*(10**decimals);
    }

    // TODO function balanceOf(address _owner) public view returns (uint256 balance)
    // TODO function transfer(address _to, uint256 _value) public returns (bool success)
    // TODO function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
    // TODO function approve(address _spender, uint256 _value) public returns (bool success)
    // TODO function allowance(address _owner, address _spender) public view returns (uint256 remaining)
}
