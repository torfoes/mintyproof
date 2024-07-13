// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract MintyProofNFT is ERC721, ERC721Enumerable, Ownable {
    using ECDSA for bytes32;

    uint256 private _nextTokenId;
    address public issuer;

    constructor(string memory name, string memory symbol, address initialOwner, address _issuer) 
        ERC721(name, symbol) 
        Ownable(initialOwner) 
    {
        issuer = _issuer;
    }

    function issueMintWithProof(
        bytes memory issuerSignature,
        bytes memory userSignature
    ) public {
        bytes32 messageHash = keccak256(abi.encodePacked(address(this)));
        bytes32 ethSignedMessageHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash));

        address recoveredIssuer = ECDSA.recover(ethSignedMessageHash, issuerSignature);
        address recoveredUser = ECDSA.recover(ethSignedMessageHash, userSignature);

        require(recoveredIssuer == issuer, "Invalid issuer signature");

        uint256 tokenId = _nextTokenId++;
        _safeMint(recoveredUser, tokenId);
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}