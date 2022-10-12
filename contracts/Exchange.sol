// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Exchange {
    address private feeAccount;
    uint8 private feePercent;

    constructor(address _feeAccount, uint8 _feePercent) {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }

    function getFeeAccount() public view returns (address) {
        return feeAccount;
    }

    function getFeePercent() public view returns (uint8) {
        return feePercent;
    }
}
