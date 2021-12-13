// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract CrowdFunding {

    enum Stages {
		CrowdfundOperational,
		CrowdfundFailure,
		CrowdfundSuccess
	}

    struct Campaign {
        bytes32 name;
        Stages stage;
        uint256 fundGoal;
        uint256 amountRaised;
        uint256 expiry;
    }

    mapping(address => Campaign) public campaignsByOwner;

    modifier atStage(address owner, Stages _expectedStage) {
		if (block.timestamp < campaignsByOwner[owner].expiry) {
			require(_expectedStage == Stages.CrowdfundOperational, "Campaign active");
		} else if(block.timestamp >= campaignsByOwner[owner].expiry && 
                campaignsByOwner[owner].amountRaised < campaignsByOwner[owner].fundGoal) {
			require(_expectedStage == Stages.CrowdfundFailure, "Campaign failed");
		} else if(block.timestamp >= campaignsByOwner[owner].expiry && 
                campaignsByOwner[owner].amountRaised >= campaignsByOwner[owner].fundGoal) {
			require(_expectedStage == Stages.CrowdfundSuccess, "Campaign terminated");
		}
		
		_;
	}

    function newCampaign(bytes32 _name, 
            uint256 _fundGoal, 
            uint256 _expiry) public 
    {
        require(_name != bytes32(0), "Name cannot be empty");
        require(campaignsByOwner[msg.sender].name == bytes32(0), "Address already registered");

        campaignsByOwner[msg.sender] = Campaign(_name, 
            Stages.CrowdfundOperational, 
            _fundGoal, 
            0, 
            block.timestamp + _expiry * 1 days);
    }

    function getOwnCampaign() public view
            returns (Campaign memory campaign)
    {
        campaign = campaignsByOwner[msg.sender];
    }

    function contributeToCampaign(address owner) 
            atStage(owner, Stages.CrowdfundOperational)
            public payable
    {
        require(msg.value > 0, "Contribution not valid");
        require(campaignsByOwner[owner].name != bytes32(0), "Campaign does not exist");

        campaignsByOwner[owner].amountRaised += msg.value;
    }

    function payoutFundRaised() 
			atStage(msg.sender, Stages.CrowdfundSuccess)
			public payable
	{
		uint256 value = campaignsByOwner[msg.sender].amountRaised;
		require(value > 0, "Payout already handed");
		
		campaignsByOwner[msg.sender].amountRaised = 0;
		payable(msg.sender).transfer(value);
	}
}
