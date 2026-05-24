```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NFTMintingEngine
 * @author Qwen (Alibaba Cloud)
 * @notice Configurable NFT minting engine with IPFS metadata storage.
 */
contract NFTMintingEngine is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    /**
     * @param _name Name of the NFT collection
     * @param _symbol Symbol of the NFT collection
     */
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    /**
     * @notice Mint a new NFT with metadata stored on IPFS.
     * @dev Only callable by the contract owner.
     * @param _to Address to mint the NFT to
     * @param _uri URI of the IPFS metadata for the NFT
     */
    function mintNFT(address _to, string memory _uri) public onlyOwner {
        require(bytes(_uri).length > 0, "IPFS URI cannot be empty");
        
        uint256 newItemId = tokenCounter;
        _safeMint(_to, newItemId);
        _setTokenURI(newItemId, _uri);

        emit MintedNFT(_to, newItemId, _uri);
        tokenCounter++;
    }

    /**
     * @notice Update the metadata URI for an existing NFT.
     * @dev Only callable by the contract owner.
     * @param _tokenId ID of the NFT to update
     * @param _newUri New URI of the IPFS metadata for the NFT
     */
    function updateNFTMetadata(uint256 _tokenId, string memory _newUri) public onlyOwner {
        require(_exists(_tokenId), "Token does not exist");
        require(bytes(_newUri).length > 0, "IPFS URI cannot be empty");

        _setTokenURI(_tokenId, _newUri);

        emit MetadataUpdated(_tokenId, _newUri);
    }

    /**
     * @notice Withdraw ETH from the contract.
     * @dev Only callable by the contract owner.
     */
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Insufficient balance");

        payable(owner()).transfer(balance);

        emit Withdrawal(owner(), balance);
    }

    /**
     * @notice Emitted when an NFT is minted.
     * @param to Address of the recipient
     * @param tokenId ID of the minted token
     * @param uri URI of the IPFS metadata for the minted token
     */
    event MintedNFT(address indexed to, uint256 indexed tokenId, string uri);

    /**
     * @notice Emitted when an NFT's metadata is updated.
     * @param tokenId ID of the updated token
     * @param newUri New URI of the IPFS metadata for the updated token
     */
    event MetadataUpdated(uint256 indexed tokenId, string newUri);

    /**
     * @notice Emitted when ETH is withdrawn from the contract.
     * @param to Address that received the withdrawal
     * @param amount Amount of ETH withdrawn
     */
    event Withdrawal(address indexed to, uint256 amount);
}
```