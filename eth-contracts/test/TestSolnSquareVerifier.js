const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const SquareVerifier = artifacts.require("SquareVerifier");
const zokratesProof = require("../../zokrates/code/square/proof.json");

let accounts;
let owner;
let instance;

contract("SolnSquareVerifier", (accs) => {
  accounts = accs;
  owner = accounts[0];
});

before(async () => {
  instance = await SolnSquareVerifier.deployed();
});

it("should add a new solution", async () => {
  assert.equal(await instance.getSolutionsLength.call(), 0);
  await instance.mintToken(
    accounts[1],
    zokratesProof.proof,
    zokratesProof.inputs,
    { from: owner}
  );
  assert.equal(await instance.getSolutionsLength.call(), 1);
});

it("should mint a new ERC721 token", async () => {
    assert.equal(await instance.totalSupply.call(), 1);
});
