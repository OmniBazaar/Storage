# OmniBazaar Storage

The Storage module handles data persistence and IPFS operations for the OmniBazaar platform.

## Directory Structure

```
src/
├── ipfs/      # IPFS node and operations
├── listing/   # Listing storage and management
└── api/       # API endpoints and interfaces
```

## Components

### IPFS
- `node.ts`: IPFS node configuration and operations
- `pinning.ts`: Content pinning management
- `gateway.ts`: IPFS gateway interface

### Listing
- `metadata.ts`: Listing metadata handling
- `storage.ts`: Listing storage operations
- `indexing.ts`: Search indexing and management

### API
- `listing.ts`: Listing-related API endpoints
- `search.ts`: Search functionality API

## Features

- IPFS node management
- Content pinning and unpinning
- Listing metadata storage
- Search indexing
- API endpoints for data access

## Integration

This module integrates with:
- Bazaar module for marketplace data
- Wallet module for transaction data
- Smart contracts for on-chain data

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure IPFS node:
   ```typescript
   const config = {
     ipfs: {
       host: 'localhost',
       port: 5001,
       protocol: 'http'
     },
     pinning: {
       enabled: true
     }
   };
   ```

3. Run tests:
   ```bash
   npm test
   ```

## Contributing

Please refer to the project's RULES.md for development guidelines and standards.