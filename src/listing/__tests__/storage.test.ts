import { ListingStorage } from '../storage';
import { Storage } from '../../storage';
import { ListingMetadata } from '../../../../Bazaar/src/types/listing';

jest.mock('../../storage');

describe('ListingStorage', () => {
    let listingStorage: ListingStorage;
    let mockStorage: jest.Mocked<Storage>;

    beforeEach(() => {
        mockStorage = new Storage() as jest.Mocked<Storage>;
        (Storage as jest.Mock).mockImplementation(() => mockStorage);
        listingStorage = new ListingStorage(mockStorage);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('storeListing', () => {
        const mockListing: ListingMetadata = {
            title: 'Test Listing',
            description: 'Test Description',
            price: 100,
            type: 'product',
            location: {
                country: 'Test Country',
                city: 'Test City',
                coordinates: { lat: 0, lng: 0 }
            },
            seller: {
                name: 'Test Seller',
                rating: 0,
                contactInfo: {
                    email: 'test@example.com',
                    phone: '1234567890'
                }
            }
        };

        it('stores a listing successfully', async () => {
            const mockCid = { toString: () => 'test-cid' };
            mockStorage.store.mockResolvedValueOnce(mockCid);

            const cid = await listingStorage.storeListing(mockListing);

            expect(mockStorage.store).toHaveBeenCalledWith(mockListing);
            expect(cid).toBe('test-cid');
        });
    });

    describe('retrieveListing', () => {
        it('retrieves a listing successfully', async () => {
            const mockListing = { title: 'Test Listing' };
            mockStorage.retrieve.mockResolvedValueOnce(mockListing);

            const listing = await listingStorage.retrieveListing('test-cid');

            expect(mockStorage.retrieve).toHaveBeenCalled();
            expect(listing).toEqual(mockListing);
        });
    });

    describe('updateListing', () => {
        const mockListing: ListingMetadata = {
            title: 'Updated Listing',
            description: 'Updated Description',
            price: 200,
            type: 'product',
            location: {
                country: 'Updated Country',
                city: 'Updated City',
                coordinates: { lat: 0, lng: 0 }
            },
            seller: {
                name: 'Updated Seller',
                rating: 0,
                contactInfo: {
                    email: 'updated@example.com',
                    phone: '0987654321'
                }
            }
        };

        it('updates a listing successfully', async () => {
            const mockCid = { toString: () => 'updated-cid' };
            mockStorage.update.mockResolvedValueOnce(mockCid);

            const cid = await listingStorage.updateListing('test-cid', mockListing);

            expect(mockStorage.update).toHaveBeenCalled();
            expect(cid).toBe('updated-cid');
        });
    });

    describe('deleteListing', () => {
        it('deletes a listing successfully', async () => {
            await listingStorage.deleteListing('test-cid');

            expect(mockStorage.delete).toHaveBeenCalled();
        });
    });

    describe('searchListings', () => {
        it('returns empty array for now', async () => {
            const filters = { type: 'product' };
            const listings = await listingStorage.searchListings(filters);

            expect(listings).toEqual([]);
        });
    });
}); 