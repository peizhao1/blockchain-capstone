// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ERC721Mintable.sol";
import "./SquareVerifier.sol";

contract SolnSquareVerifier is ERC721Mintable, SquareVerifier {

    struct Solution {
        bytes32 key;
        uint256 tokenId;
    }

    Solution[] private _solutions;
    mapping(bytes32 => bool) private _uniqueSolutions;

    event SolutionAdded(bytes32 key, uint256 tokenId);

    constructor() ERC721Mintable("Real Estate Token", "RET") {}

    function getSolutionsLength() public view returns (uint256) {
        return _solutions.length;
    }

    function _addSolution(
        SquareVerifier.Proof memory proof,
        uint256[2] memory input
    ) private {
        bytes32 key = keccak256(abi.encodePacked(input));

        require(
            !_uniqueSolutions[key],
            "This solution has already been added"
        );
        bool isValidSolution = verifyTx(proof, input);
        require(isValidSolution, "The provided proof is not valid");

        uint256 tokenId = _solutions.length;
        Solution memory solution = Solution(key, tokenId);
        _solutions.push(solution);
        _uniqueSolutions[key] = true;

        emit SolutionAdded(key, tokenId);
    }

    function mintToken(
        address to,
        SquareVerifier.Proof memory proof,
        uint256[2] memory input
    ) public {
        _addSolution(proof, input);
        super.mint(to);
    }
}
