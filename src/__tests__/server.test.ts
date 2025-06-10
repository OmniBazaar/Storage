import request from 'supertest';
import { app } from '../server';
import { ListingStorage } from '../listing/storage';

jest.mock('../listing/storage');

describe('Server', () => {
    let mockListingStorage: jest.Mocked<ListingStorage>;

    beforeEach(() => {
        mockListingStorage = new ListingStorage({} as any) as jest.Mocked<ListingStorage>;
        (ListingStorage as jest.Mock).mockImplementation(() => mockListingStorage);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /api/listings', () => {
        const mockListing = {
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

        it('creates a listing successfully', async () => {
            mockListingStorage.storeListing.mockResolvedValueOnce('test-cid');

            const response = await request(app)
                .post('/api/listings')
                .send(mockListing);

            expect(response.status).toBe(201);
            expect(response.body).toEqual({ cid: 'test-cid' });
        });

        it('handles errors', async () => {
            mockListingStorage.storeListing.mockRejectedValueOnce(new Error('Storage error'));

            const response = await request(app)
                .post('/api/listings')
                .send(mockListing);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to create listing' });
        });
    });

    describe('GET /api/listings/:cid', () => {
        it('retrieves a listing successfully', async () => {
            const mockListing = { title: 'Test Listing' };
            mockListingStorage.retrieveListing.mockResolvedValueOnce(mockListing);

            const response = await request(app)
                .get('/api/listings/test-cid');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockListing);
        });

        it('handles errors', async () => {
            mockListingStorage.retrieveListing.mockRejectedValueOnce(new Error('Storage error'));

            const response = await request(app)
                .get('/api/listings/test-cid');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Listing not found' });
        });
    });

    describe('PUT /api/listings/:cid', () => {
        const mockListing = {
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
            mockListingStorage.updateListing.mockResolvedValueOnce('updated-cid');

            const response = await request(app)
                .put('/api/listings/test-cid')
                .send(mockListing);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ cid: 'updated-cid' });
        });

        it('handles errors', async () => {
            mockListingStorage.updateListing.mockRejectedValueOnce(new Error('Storage error'));

            const response = await request(app)
                .put('/api/listings/test-cid')
                .send(mockListing);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to update listing' });
        });
    });

    describe('DELETE /api/listings/:cid', () => {
        it('deletes a listing successfully', async () => {
            const response = await request(app)
                .delete('/api/listings/test-cid');

            expect(response.status).toBe(204);
        });

        it('handles errors', async () => {
            mockListingStorage.deleteListing.mockRejectedValueOnce(new Error('Storage error'));

            const response = await request(app)
                .delete('/api/listings/test-cid');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to delete listing' });
        });
    });

    describe('POST /api/listings/search', () => {
        it('returns empty array for now', async () => {
            const mockFilters = { type: 'product' };

            const response = await request(app)
                .post('/api/listings/search')
                .send(mockFilters);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ listings: [] });
        });

        it('handles errors', async () => {
            mockListingStorage.searchListings.mockRejectedValueOnce(new Error('Storage error'));

            const response = await request(app)
                .post('/api/listings/search')
                .send({ type: 'product' });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to search listings' });
        });
    });
}); 