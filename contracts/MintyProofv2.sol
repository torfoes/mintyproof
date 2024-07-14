// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract VisitProofNFT is ERC721Enumerable, Ownable {
    using ECDSA for bytes32;

    struct IssuerDetails {
        bytes publicKey;
        uint256 nftTokenId;
    }

    mapping(bytes32 => IssuerDetails) public issuers;

    constructor(string memory name, string memory symbol, address initialOwner)
        ERC721(name, symbol)
        Ownable(initialOwner)
    {
    }

    event LogEthSignedMessageHash(bytes32 indexed ethSignedMessageHash);

    function registerIssuer(bytes32 issuerId, bytes memory publicKey, uint256 nftTokenId) public {
        issuers[issuerId] = IssuerDetails({
            publicKey: publicKey,
            nftTokenId: nftTokenId
        });
    }

    function claimNFT(bytes32 issuerId, bytes memory issuerSignature) public {
        IssuerDetails memory issuer = issuers[issuerId];
        require(issuer.publicKey.length > 0, "Issuer not registered");

        bytes32 messageHash = keccak256(abi.encode(msg.sender));
        
        bytes32 ethSignedMessageHash = keccak256(
            abi.encode("\x19Ethereum Signed Message:\n32", messageHash)
        );

        emit LogEthSignedMessageHash(ethSignedMessageHash);

        // Extract the address from the public key
        address issuerAddress = address(uint160(uint256(keccak256(issuer.publicKey))));

        // Recover the signer's address from the signature
        address recoveredAddress = ecrecover(ethSignedMessageHash, uint8(issuerSignature[64]), bytes32(issuerSignature), bytes32(issuerSignature[32]));

        // Check if the recovered address matches the extracted address from the public key
        require(recoveredAddress == issuerAddress, "Invalid signature");

        _mint(msg.sender, issuer.nftTokenId);
    }
}
