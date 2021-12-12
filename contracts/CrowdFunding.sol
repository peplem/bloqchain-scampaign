// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract CrowdFunding {

    struct Campaign {
        bytes32 name;
        uint256 fundGoal;
        uint256 amountRaised;
        uint256 expiry;
    }

    mapping(address => Campaign) public campaignsByOwner;

    function newCampaign(bytes32 _name, 
            uint256 _fundGoal, 
            uint256 _expiry) public 
    {
        require(_name != bytes32(0), "Name cannot be empty");
        require(campaignsByOwner[msg.sender].name == bytes32(0), "Address already registered");

        campaignsByOwner[msg.sender] = Campaign(_name, _fundGoal, 0, _expiry);
    }

    function getOwnCampaign() public view
            returns (Campaign memory campaign)
    {
        campaign = campaignsByOwner[msg.sender];
    }

    function contributeToCampaign(address owner) public payable {
        require(msg.value > 0, "Contribution not valid");
        require(campaignsByOwner[owner].name != bytes32(0), "Campaign does not exist");

        campaignsByOwner[owner].amountRaised += msg.value;
    }
}
