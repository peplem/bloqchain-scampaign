//const BalanceClaim = artifacts.require("BalanceClaim");
const CrowdFunding = artifacts.require("CrowdFunding");
const Registry = artifacts.require("Registry");

module.exports = function(deployer) {
  //deployer.deploy(BalanceClaim);
  deployer.deploy(CrowdFunding);
  deployer.deploy(Registry);
};
