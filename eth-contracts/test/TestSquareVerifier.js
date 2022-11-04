const SquareVerifier = artifacts.require("SquareVerifier");
const zokratesProof = require("../../zokrates/code/square/proof.json");

let instance;

contract("SquareVerifier", () => {});

before(async () => {
  instance = await SquareVerifier.deployed();
});

it("should verify with the correct proof", async () => {
  let result = await instance.verifyTx.call(
    zokratesProof.proof,
    zokratesProof.inputs
  );
  assert.equal(result, true);
});

it("should not verify with the incorrect proof", async () => {
  let incorrectProof = JSON.parse(JSON.stringify(zokratesProof.proof));
  incorrectProof.a[0] = incorrectProof.a[1];
  let err = false;
  try {
    await instance.verifyTx.call(incorrectProof, zokratesProof.inputs);
  } catch {
    err = true;
  }
  assert.equal(err, true);
});
