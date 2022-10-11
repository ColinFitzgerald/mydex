// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    constructor(string memory _name, string memory _symbol, uint256 _totalSupply) {
        name = _name;
        symbol = _symbol;
        decimals = 18;
        balanceOf[msg.sender] = totalSupply = _totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        // The function SHOULD throw if the message caller’s account balance
        // does not have enough tokens to spend.
        require(balanceOf[msg.sender] >= _value);

        require(_to != address(0));

        balanceOf[msg.sender] -= _value;

        balanceOf[_to] += _value;

        // and MUST fire the Transfer event.
        emit Transfer(msg.sender, _to, _value);

        return true;
    }


    // TODO function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
    // TODO function approve(address _spender, uint256 _value) public returns (bool success)
    // TODO function allowance(address _owner, address _spender) public view returns (uint256 remaining)
}
