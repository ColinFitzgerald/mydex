// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    constructor(string memory _name, string memory _symbol, uint256 _totalSupply) {
        name = _name;
        symbol = _symbol;
        decimals = 18;
        totalSupply = _totalSupply;
    }

    // TODO function balanceOf(address _owner) public view returns (uint256 balance)
    // TODO function transfer(address _to, uint256 _value) public returns (bool success)
    // TODO function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
    // TODO function approve(address _spender, uint256 _value) public returns (bool success)
    // TODO function allowance(address _owner, address _spender) public view returns (uint256 remaining)
}
