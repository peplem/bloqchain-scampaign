// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract BalanceClaim {

    address payable public owner;

    constructor(address payable _owner) {
        owner = _owner;
    }

    function withdraw() public {
        require(msg.sender == owner, "Not authorized");
        selfdestruct(owner);
    }
}
