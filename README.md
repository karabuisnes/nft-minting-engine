# 🌟 NFT Minting Engine

[![Build Status](https://github.com/KaiSilva/nft-minting-engine/workflows/Node.js%20CI/badge.svg)](https://github.com/KaiSilva/nft-minting-engine/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/@kaisilva%2Fnft-minting-engine.svg)](https://www.npmjs.com/package/@kaisilva/nft-minting-engine)

## Description

Configurable NFT minting engine with IPFS metadata storage. Built using Solidity, Hardhat, and Pinata.

## Features

- Configurable NFT minting logic
- IPFS metadata storage
- Easy deployment and management

## Quick Start / Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KaiSilva/nft-minting-engine.git
   cd nft-minting-engine
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Deploy the contract using Hardhat:
   ```bash
   npx hardhat run scripts/deploy.js --network <your-network>
   ```

4. Configure IPFS and Pinata in `hardhat.config.js`:

   ```javascript
   module.exports = {
     networks: {
       // Your network configurations here
     },
     ipfs: {
       projectId: 'YOUR_IPFS_PROJECT_ID',
       projectSecret: 'YOUR_IPFS_PROJECT_SECRET'
     }
   };
   ```

5. Run the minting script:
   ```bash
   npx hardhat run scripts/mint.js --network <your-network>
   ```

## Usage Example

```javascript
const NFTMintingEngine = require('@kaisilva/nft-minting-engine');

async function main() {
  const engine = new NFTMintingEngine({
    contractAddress: '0xYourContractAddress',
    metadataUri: 'ipfs://QmYourMetadataCID'
  });

  const tokenURI = await engine.mintNFT('recipientAddress');
  console.log(`Token URI: ${tokenURI}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

## Tech Stack

- **Programming Language**: Solidity
- **Development Environment**: Hardhat
- **IPFS Storage**: Pinata

## Project Structure

```
nft-minting-engine/
├── contracts/
│   ├── NFTMintingEngine.sol
│   └── ...
├── scripts/
│   ├── deploy.js
│   ├── mint.js
│   └── ...
├── hardhat.config.js
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please read our [CONTRIBUTING](CONTRIBUTING.md) guide for details on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```