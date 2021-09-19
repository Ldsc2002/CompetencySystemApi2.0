var CompetencySystem = artifacts.require("./CompetencySystem.sol");

module.exports = function(deployer) {
  deployer.deploy(CompetencySystem);
};