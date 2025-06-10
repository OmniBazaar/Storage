import { Request, Response } from 'express';
import { ListingStorage } from '../listing/storage';
import { ListingMetadata, SearchFilters } from '../../Bazaar/src/types/listing';

export class ListingAPI {
    private storage: ListingStorage;

    constructor(storage: ListingStorage) {
        this.storage = storage;
    }

    async createListing(req: Request, res: Response): Promise<void> {
        try {
            const listing: ListingMetadata = req.body;
            const cid = await this.storage.storeListing(listing);
            res.status(201).json({ cid });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create listing' });
        }
    }

    async getListing(req: Request, res: Response): Promise<void> {
        try {
            const { cid } = req.params;
            const listing = await this.storage.retrieveListing(cid);
            res.json(listing);
        } catch (error) {
            res.status(404).json({ error: 'Listing not found' });
        }
    }

    async updateListing(req: Request, res: Response): Promise<void> {
        try {
            const { cid } = req.params;
            const listing: ListingMetadata = req.body;
            const newCid = await this.storage.updateListing(cid, listing);
            res.json({ cid: newCid });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update listing' });
        }
    }

    async deleteListing(req: Request, res: Response): Promise<void> {
        try {
            const { cid } = req.params;
            await this.storage.deleteListing(cid);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete listing' });
        }
    }

    async searchListings(req: Request, res: Response): Promise<void> {
        try {
            const filters: SearchFilters = req.body;
            // TODO: Implement search functionality
            res.json({ listings: [] });
        } catch (error) {
            res.status(500).json({ error: 'Failed to search listings' });
        }
    }
} 