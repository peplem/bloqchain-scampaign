// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Registry {

    struct Contribution {
        address payable sender;
        uint256 value;
    }

    mapping(address => Contribution[]) public contributionsByCampaign;

    function registerContribution(address owner) public payable {
        contributionsByCampaign[owner].push(Contribution(
            payable(msg.sender),
            msg.value
        ));
    }

    function getAllContributions() public view
            returns (Contribution[] memory contributions)
    {
        contributions = contributionsByCampaign[msg.sender];
    }
}