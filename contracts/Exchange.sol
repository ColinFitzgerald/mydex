// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0 .0;

import "hardhat/console.sol";
import "./Token.sol";

contract Exchange {
    address private feeAccount;
    uint8 private feePercent;

    mapping(address => mapping(address => uint256)) public tokens;

    event Deposit(
        address indexed _token,
        address indexed _user,
        uint256 _amount,
        uint256 _balance
    );

    constructor(address _feeAccount, uint8 _feePercent) public {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }

    function getFeeAccount() public view returns (address) {
        return feeAccount;
    }

    function getFeePercent() public view returns (uint8) {
        return feePercent;
    }

    // Deposit Token
    function depositToken(address _token, uint256 _amount) public {
        // Transfer tokens to the exchange...
        require(
            Token(_token).transferFrom(msg.sender, address(this), _amount),
            "Token transfer failed"
        );

        // ...then update the users token balance...
        tokens[_token][msg.sender] += _amount;

        // ...and finally emit a deposit event.
        emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }

    // Check Balance
    function balanceOf(address _token, address _user)
        public
        view
        returns (uint256)
    {
        return tokens[_token][_user];
    }
}
