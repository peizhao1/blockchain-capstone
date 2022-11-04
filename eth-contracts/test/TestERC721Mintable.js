const ERC721Mintable = artifacts.require("ERC721Mintable");

let accounts;
let owner;
let instance;

contract("ERC721Mintable", (accs) => {
  accounts = accs;
  owner = accounts[0];
});

before(async () => {
  instance = await ERC721Mintable.deployed();
});

it("should return total supply", async () => {
  assert.equal(await instance.totalSupply.call(), 0);
  await instance.mint(owner, { from: owner });
  assert.equal(await instance.totalSupply.call(), 1);
});

it("should get token balance", async () => {
  assert.equal(await instance.balanceOf.call(owner), 1);
});

it("should return token uri", async () => {
  assert.equal(
    await instance.tokenURI.call(0),
    "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/0"
  );
});

it("should transfer token from one owner to another", async () => {
  assert.equal(await instance.ownerOf.call(0), owner);
  await instance.safeTransferFrom(owner, accounts[1], 0, { from: owner });
  assert.equal(await instance.ownerOf.call(0), accounts[1]);
});

it("should fail when minting when address is not contract owner", async () => {
  let err = false;
  try {
    await instance.mint(owner, { from: accounts[1] });
  } catch {
    err = true;
  }
  assert.equal(err, true);
});

it("should return contract owner", async () => {
  assert.equal(await instance.getOwner.call(), owner);
});
