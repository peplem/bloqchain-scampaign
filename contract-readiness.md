# Contract Readiness

This is a small document detailing our work to ensure contract readiness (i.e. audits, reviews, changes, etc). You can read more about WeiFund's approach to contract readiness [here](https://media.consensys.net/shaping-crowdfund-rollout-readiness-at-weifund-30149a0b0f45#.5n7h1zwzr). 

## User Stories

* As WeiFund, I want to provide campaign contracts that can accommodate many campaign designs including those with no, one, or multiple ERC20-compliant tokens so that Campaigners can leverage a hardened smart contract system for many different campaign types.
* As a Contributor I want to be able see a list of active campaigns on WeiFund so that I can browse existing options
* As a Contributor I want to be able to see details on live campaigns so that I can understand what the campaign is about and its technical details including addresses, funding goals, and funding caps
* As a Contributor I want to be able to invest ether in a campaign so that I can fund a project and receive my rewards tokens
* As a Contributor I want to be able to generate new lightwallets securely using safe sources of entropy so that I can create a light wallet even if I don't have one yet
* As a Contributor I want to be able to load existing lightwallets either by its seed or an encrypted file backup so that I can use accounts I have previously set up
* As a Contributor I would like to be forced to specify I have properly backed up my seed so that I can recreate my lightwallet at a later time, such as when tokens are issued to my account
* As a Contributor I want to receive a receipt for my campaign contribution so that I can reliably retrieve information about the campaign and account I used to contribute at a later date
* As a Contributor I want to be able to claim my reward tokens when a campaign has succeeded so that I can later transfer them to another account or to an exchange
* As a Contributor I want to be able to claim a refund when a campaign fails so that I can retrieve the ether I contributed
* As a Contributor I want to be able to register email address during my contribution to a project for campaigns that request it so that I can stay up to date on project details. 
* As a Campaigner, I want to be able to send funds for a Campaign that has successfully ended to the beneficiary address so that I can use the funds provided to my project by contributors
* As a Contributor I want to see the campaigns that have ended which I have invested in so that I can keep track of my investments on an account page

## Key Management

Proper key management of beneficiary accounts is an important aspect to any smart contract campaign. This contract readiness document defines the steps taken to prepare the WeiFund contracts for our Bug Bounty program.

It is important to note that proper key management documentation should be made available on each subequent campaign that uses these contracts.  

* We are using [this multisig wallet contract](https://github.com/weifund/weifund-contracts/blob/master/src/contracts/wallets/MultiSigWallet.sol) for the beneficiaries of the two bug bounty campaigns
* The wallet will be set up to be 2 of 3 keys for approving the movement of funds out of the account
* The keys are held by distinct individuals
* At least two of the keys were generated on online computers. 
* Note: For accounts that intend to control large amounts of ether for extended periods of time, it is typical to use a key management soluton that involves the use of offline computers for the generation of keys. Since the multisig wallet will only hold funds for a breif period after the "successful" bug bounty campaign ends, it was deemed appropriate to use the approach outlined above. 
* The seeds were properly backed up and stored in geographically separated locations. 
