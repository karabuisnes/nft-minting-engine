```javascript
/**
 * @file hardhat.config.js
 * @description Configuration file for Hardhat project "nft-minting-engine".
 * @author Your Name <your.email@example.com>
 * @version 1.0.0
 */

// Require necessary dependencies
const { ethers } = require("hardhat");
const pinataSDK = require('@pinata/sdk');

// Retrieve PINATA_API_KEY and PINATA_SECRET from environment variables
if (!process.env.PINATA_API_KEY || !process.env.PINATA_SECRET) {
    throw new Error('PINATA_API_KEY and PINATA_SECRET must be set in the .env file');
}

// Initialize Pinata SDK with API key and secret
const pinata = pinataSDK({
    apiKey: process.env.PINATA_API_KEY,
    apiSecret: process.env.PINATA_SECRET
});

/**
 * @name hardhatConfig
 * @description Configuration for Hardhat project.
 * @returns {Object} Hardhat configuration object.
 */
module.exports = async () => {
    return {
        solidity: "0.8.4",
        networks: {
            mainnet: {
                url: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
                accounts: [process.env.PRIVATE_KEY]
            },
            rinkeby: {
                url: "https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID",
                accounts: [process.env.PRIVATE_KEY]
            }
        },
        ipfs: {
            pinata,
            endpoint: 'https://api.pinata.cloud/pinning/pinFileToIPFS'
        }
    };
};
```