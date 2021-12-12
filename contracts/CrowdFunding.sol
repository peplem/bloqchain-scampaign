// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract CrowdFunding {

    struct Campaign {
        bytes32 name;
        //address payable owner;
        uint256 fundGoal;
        uint256 amountRaised;
        uint256 expiry;
    }

    
    mapping(address => Campaign) public campaignsByAddress;

    function newCampaign(bytes32 _name) public {
        campaignsByAddress[msg.sender] = Campaign(_name, 0, 0, 0);
    }

    function setFundGoal(uint256 _fundGoal) public {
        campaignsByAddress[msg.sender].fundGoal = _fundGoal;
    }

    function setExpiry(uint256 _expiry) public {
        campaignsByAddress[msg.sender].expiry = _expiry;
    }

    function getOwnCampaign() public view
            returns (Campaign memory campaign)
    {
        campaign = campaignsByAddress[msg.sender];
        //emit campaignList(campaign);
    }

    function contributeToCampaign(address _owner) public payable {
        require(msg.value > 0, "Contribution not valid");

        campaignsByAddress[_owner].amountRaised += msg.value;
    }

    //event campaignList(Campaign campaign);
}
