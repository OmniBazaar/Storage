# Storage

Code and documents for distributed storage system and infrastructure.

This module will be the Listing Node module. It will store user listings in IPFS (as NFTs) and operate the DHT to enable product listing lookup.

Reference the legacy OmniBazaar code for the general design and actions of a listing node.

This module, the chat module, and the validator module will almost certainly be published together in a single browser extension and/or a stand-alone app. Use of this app by users will form the distributed infrastructure of OmniBazaar, OmniCoin, and the distributed chat system of OmniBazaar.

## Features

- Distributed storage using IPFS
- NFT-based listing storage
- DHT for product listing lookup
- Integration with chat and validator modules

## Installation

1. Clone the repository:

```bash
git clone https://github.com/OmniBazaar/Storage.git
cd Storage
```

1. Install dependencies:

```bash
npm install
```

1. Create a `.env` file with your configuration:

```bash
IPFS_API_URL=your_ipfs_api_url
```

## Usage

1. Start the storage node:

```bash
npm run start
```

1. Monitor the node:

```bash
npm run monitor
```

## Development

1. Run tests:

```bash
npm test
```

1. Build the project:

```bash
npm run build
```

1. Lint the code:

```bash
npm run lint
```

1. Run type checking:

```bash
npm run type-check
```