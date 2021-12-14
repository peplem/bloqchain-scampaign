// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract CrowdFunding {

    enum Stages {
		Operational,
		Failure,
		Success
	}

    struct Campaign {
        bytes32 name;
        Stages stage;
        uint256 fundGoal;
        uint256 amountRaised;
        uint256 expiry;
    }

    mapping(address => Campaign) public campaignsByOwner;

    function checkStage(address owner) public view
        returns (Stages currentStage)
    {
        if (block.timestamp < campaignsByOwner[owner].expiry) {
			currentStage = Stages.Operational;
		} else if(block.timestamp >= campaignsByOwner[owner].expiry && 
                campaignsByOwner[owner].amountRaised < campaignsByOwner[owner].fundGoal) {
			currentStage = Stages.Failure;
		} else if(block.timestamp >= campaignsByOwner[owner].expiry &&
                campaignsByOwner[owner].amountRaised >= campaignsByOwner[owner].fundGoal) {
			currentStage = Stages.Success;
		}
    }

    function newCampaign(bytes32 _name, 
            uint256 _fundGoal, 
            uint256 _expiry) public 
    {
        require(_name != bytes32(0), "Name cannot be empty");
        require(campaignsByOwner[msg.sender].name == bytes32(0), "Address already registered");

        require(_fundGoal > 0, "Campaign goal not valid");
        require(_expiry > 0, "Campaign expiry not valid");

        campaignsByOwner[msg.sender] = Campaign(_name, 
            Stages.Operational, 
            _fundGoal, 
            0, 
            block.timestamp + _expiry * 1 days);
    }

    function getOwnCampaign() public
            returns (Campaign memory campaign)
    {
        campaignsByOwner[msg.sender].stage = checkStage(msg.sender);
        
        campaign = campaignsByOwner[msg.sender];
        emit GetOwnCampaign(campaign);
    }

    function contributeToCampaign(address owner) public payable {
        require(campaignsByOwner[owner].stage == Stages.Operational, "Campaign terminated");
        
        require(msg.value > 0, "Contribution not valid");
        require(campaignsByOwner[owner].name != bytes32(0), "Campaign does not exist");

        campaignsByOwner[owner].amountRaised += msg.value;
    }

    function payoutFundRaised() public payable {
		require(campaignsByOwner[msg.sender].stage == Stages.Success, "Payout not available");
        
        uint256 value = campaignsByOwner[msg.sender].amountRaised;
		require(value > 0, "Payout already handed");
		
		campaignsByOwner[msg.sender].amountRaised = 0;
		payable(msg.sender).transfer(value);
	}

    event GetOwnCampaign(Campaign campaign);
}
