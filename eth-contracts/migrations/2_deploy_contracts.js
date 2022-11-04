// migrating the appropriate contracts
const ERC721Mintable = artifacts.require("ERC721Mintable");
const SquareVerifier = artifacts.require("SquareVerifier");
const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

module.exports = function(deployer) {
  deployer.deploy(ERC721Mintable, "Real Estate Token", "RET");
  deployer.deploy(SquareVerifier);
  deployer.deploy(SolnSquareVerifier);
};
