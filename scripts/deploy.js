```javascript
/**
 * Deploys an NFT contract to a specified network using Hardhat and Pinata for IPFS metadata storage.
 * @module deploy
 * @requires dotenv - For loading environment variables.
 * @requires hardhat - For interacting with the Ethereum network.
 * @requires @pinata/sdk - For uploading files to IPFS via Pinata.
 */

const hre = require("hardhat");
require("dotenv").config();

/**
 * Deploys an NFT contract and pins metadata to IPFS using Pinata.
 * @async
 * @function deployNFTContract
 * @returns {Promise<void>}
 */
async function deployNFTContract() {
  try {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy NFT contract
    const NFT = await hre.ethers.getContractFactory("MyNFT");
    const nft = await NFT.deploy();
    await nft.deployed();

    console.log("NFT Contract deployed to:", nft.address);

    // Pin metadata to IPFS using Pinata
    const pinataSDK = require("@pinata/sdk")({
      pinataHost: process.env.PINATA_HOST,
      pinataPublicKey: process.env.PINATA_PUBLIC_KEY,
      pinataPrivateKey: process.env.PINATA_PRIVATE_KEY
    });

    const metadata = {
      name: "My NFT",
      description: "A sample NFT for minting engine",
      image: "ipfs://QmZMxWV2dKoBqGyD8pJhUv9X7T4n5H5E6F7R8S9T"
    };

    const options = {
      pinataMetadata: { name: "My NFT Metadata" }
    };

    const response = await pinataSDK.pinJSONToIPFS(metadata, options);
    console.log("Metadata pinned to IPFS:", response.IpfsHash);

    // Set metadata URI in the deployed contract
    await nft.setMetadataURI(response.IpfsHash);
    console.log("Metadata URI set in contract.");

  } catch (error) {
    console.error("Error deploying NFT contract and pinning metadata:", error);
  }
}

// Deploy the NFT contract
deployNFTContract();
```

### Notes:
1. **Environment Variables**: Ensure you have a `.env` file at the root of your project with the following variables:
   ```
   PINATA_HOST=https://api.pinata.cloud/pinning/v1/pinFileToIPFS
   PINATA_PUBLIC_KEY=your_pinata_public_key
   PINATA_PRIVATE_KEY=your_pinata_private_key
   ```

2. **Contract**: The `MyNFT` contract should be present in the `contracts/MyNFT.sol` file and include a function to set the metadata URI.

3. **Error Handling**: Proper error handling is included with `try...catch` blocks for both deployment and IPFS pinning operations.

4. **Logging**: Detailed logs are provided throughout the script to help with debugging and understanding the flow of execution.