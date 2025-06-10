import { CID } from 'multiformats/cid';
import { ListingMetadata } from '../../Bazaar/src/types/listing';
import { Storage } from '../storage';

export class ListingStorage {
    private storage: Storage;

    constructor(storage: Storage) {
        this.storage = storage;
    }

    async storeListing(listing: ListingMetadata): Promise<string> {
        const cid = await this.storage.store(listing);
        return cid.toString();
    }

    async retrieveListing(cid: string): Promise<ListingMetadata> {
        const data = await this.storage.retrieve(CID.parse(cid));
        return data as ListingMetadata;
    }

    async updateListing(cid: string, listing: ListingMetadata): Promise<string> {
        const newCid = await this.storage.update(CID.parse(cid), listing);
        return newCid.toString();
    }

    async deleteListing(cid: string): Promise<void> {
        await this.storage.delete(CID.parse(cid));
    }

    async searchListings(filters: any): Promise<ListingMetadata[]> {
        // TODO: Implement search functionality
        return [];
    }
} 