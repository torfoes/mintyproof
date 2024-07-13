// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SecureNFTAccess is ERC721, ERC721Enumerable, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    using ECDSA for bytes32;

    Counters.Counter private _tokenIds;
    
    mapping(address => bool) public accessGranted;
    mapping(bytes32 => bool) public usedSignatures;

    uint256 public constant SIGNATURE_VALIDITY_PERIOD = 5 minutes;

    event AccessGranted(address indexed user, uint256 timestamp);

    constructor() ERC721("SecureNFTAccess", "SNFA") Ownable(msg.sender) {}

    function grantAccess(
        bytes32 messageHash,
        bytes memory signature1,
        bytes memory signature2,
        uint256 timestamp
    ) public nonReentrant {
        require(block.timestamp <= timestamp + SIGNATURE_VALIDITY_PERIOD, "Signature expired");
        require(!usedSignatures[messageHash], "Signature already used");

        bytes32 fullMessageHash = keccak256(abi.encodePacked(messageHash, timestamp, msg.sender));
        bytes32 ethSignedMessageHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", fullMessageHash));

        address signer1 = ECDSA.recover(ethSignedMessageHash, signature1);
        address signer2 = ECDSA.recover(ethSignedMessageHash, signature2);

        require(signer1 == owner(), "Invalid owner signature");
        require(signer2 == address(this), "Invalid contract signature");

        accessGranted[msg.sender] = true;
        usedSignatures[messageHash] = true;

        emit AccessGranted(msg.sender, block.timestamp);
    }

    function mint() public returns (uint256) {
        require(accessGranted[msg.sender], "Access not granted");
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        return newTokenId;
    }

    function checkAccess(address user) public view returns (bool) {
        return accessGranted[user];
    }

    function revokeAccess(address user) public onlyOwner {
        accessGranted[user] = false;
    }

    // Contract signature function (simulating NFC tag)
    function getContractSignature(bytes32 messageHash) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash));
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _update(address to, uint256 tokenId, address auth) internal override(ERC721, ERC721Enumerable) returns (address) {
        address result = super._update(to, tokenId, auth);
        
        return result;
    }

    function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }
}