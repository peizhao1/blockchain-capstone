// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

contract ERC721Mintable is ERC721PresetMinterPauserAutoId {
    address private _owner;

    constructor(string memory name, string memory symbol)
        ERC721PresetMinterPauserAutoId(
            name,
            symbol,
            "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"
        )
    {
        _owner = msg.sender;
    }

    function getOwner() public view returns (address) {
        return _owner;
    }
}
