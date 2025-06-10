import express from 'express';
import cors from 'cors';
import { Storage } from './storage';
import { ListingStorage } from './listing/storage';
import { ListingAPI } from './api/listing';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize storage and APIs
const storage = new Storage();
const listingStorage = new ListingStorage(storage);
const listingAPI = new ListingAPI(listingStorage);

// Routes
app.post('/api/listings', (req, res) => listingAPI.createListing(req, res));
app.get('/api/listings/:cid', (req, res) => listingAPI.getListing(req, res));
app.put('/api/listings/:cid', (req, res) => listingAPI.updateListing(req, res));
app.delete('/api/listings/:cid', (req, res) => listingAPI.deleteListing(req, res));
app.post('/api/listings/search', (req, res) => listingAPI.searchListings(req, res));

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 