export const CONTRACT_CODE = "// SPDX-License-Identifier: MIT\n" +
    "pragma solidity ^0.8.20;\n" +
    "\n" +
    "import \"@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol\";\n" +
    "import \"@openzeppelin/contracts/access/Ownable.sol\";\n" +
    "import \"@openzeppelin/contracts/utils/cryptography/ECDSA.sol\";\n" +
    "import \"@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol\";\n" +
    "\n" +
    "contract VisitProofNFT is ERC721Enumerable, Ownable {\n" +
    "    using ECDSA for bytes32;\n" +
    "\n" +
    "    struct IssuerDetails {\n" +
    "        bytes publicKey;\n" +
    "        uint256 nftTokenId;\n" +
    "    }\n" +
    "\n" +
    "    mapping(bytes32 => IssuerDetails) public issuers;\n" +
    "\n" +
    "    constructor(string memory name, string memory symbol, address initialOwner)\n" +
    "        ERC721(name, symbol)\n" +
    "        Ownable(initialOwner)\n" +
    "    {\n" +
    "    }\n" +
    "    event LogEthSignedMessageHash(bytes32 indexed ethSignedMessageHash);\n" +
    "\n" +
    "    function registerIssuer(bytes32 issuerId, bytes memory publicKey, uint256 nftTokenId) public {\n" +
    "        issuers[issuerId] = IssuerDetails({\n" +
    "            publicKey: publicKey,\n" +
    "            nftTokenId: nftTokenId\n" +
    "        });\n" +
    "    }\n" +
    "\n" +
    "    function claimNFT(bytes32 issuerId, bytes memory issuerSignature) public {\n" +
    "        IssuerDetails memory issuer = issuers[issuerId];\n" +
    "        require(issuer.publicKey.length > 0, \"Issuer not registered\");\n" +
    "\n" +
    "        bytes32 messageHash = keccak256(abi.encode(msg.sender));\n" +
    "        \n" +
    "        bytes32 ethSignedMessageHash = keccak256(\n" +
    "            abi.encode(\"\x19Ethereum Signed Message:\\n32\", messageHash)\n" +
    "        );\n" +
    "\n" +
    "        emit LogEthSignedMessageHash(ethSignedMessageHash);\n" +
    "\n" +
    "\n" +
    "        address issuerAddress = address(uint160(uint256(keccak256(issuer.publicKey))));\n" +
    "\n" +
    "        require(\n" +
    "            SignatureChecker.isValidSignatureNow(issuerAddress, ethSignedMessageHash, issuerSignature),\n" +
    "            \"Invalid signature\"\n" +
    "        );\n" +
    "\n" +
    "        _mint(msg.sender, issuer.nftTokenId);\n" +
    "    }\n" +
    "\n" +
    "}\n"