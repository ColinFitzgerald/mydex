// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply
    ) {
        name = _name;
        symbol = _symbol;
        decimals = 18;
        balanceOf[msg.sender] = totalSupply = _totalSupply;

        emit Transfer(address(0), msg.sender, totalSupply);
    }

    function _transfer(
        address _from,
        address _to,
        uint256 _value
    ) internal returns (bool success) {
        // The function SHOULD throw if the message caller’s account balance
        // does not have enough tokens to spend.
        require(balanceOf[_from] >= _value, "Insufficient balance");

        require(_to != address(0), "Cannot transfer to null address");

        balanceOf[_from] -= _value;

        balanceOf[_to] += _value;

        // and MUST fire the Transfer event.
        emit Transfer(_from, _to, _value);

        return true;
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        return _transfer(msg.sender, _to, _value);
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(_value <= allowance[_from][msg.sender], "Insufficient balance");

        require(_transfer(_from, _to, _value) == true, "Token transfer failed");

        allowance[_from][msg.sender] -= _value;

        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        require(_spender != address(0), "Cannot approve the null address");

        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }
}
