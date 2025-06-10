import { Storage } from '../storage';
import { CID } from 'multiformats/cid';

jest.mock('ipfs-http-client', () => ({
    create: jest.fn(() => ({
        add: jest.fn(),
        cat: jest.fn(),
        pin: {
            rm: jest.fn()
        }
    }))
}));

describe('Storage', () => {
    let storage: Storage;
    let mockIpfs: any;

    beforeEach(() => {
        storage = new Storage();
        mockIpfs = (storage as any).ipfs;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('store', () => {
        it('stores data successfully', async () => {
            const mockData = { test: 'data' };
            const mockCid = { toString: () => 'test-cid' };
            mockIpfs.add.mockResolvedValueOnce({ cid: mockCid });

            const cid = await storage.store(mockData);

            expect(mockIpfs.add).toHaveBeenCalledWith(JSON.stringify(mockData));
            expect(cid).toBeInstanceOf(CID);
        });
    });

    describe('retrieve', () => {
        it('retrieves data successfully', async () => {
            const mockData = { test: 'data' };
            const mockCid = CID.parse('test-cid');
            const mockStream = (async function* () {
                yield Buffer.from(JSON.stringify(mockData));
            })();
            mockIpfs.cat.mockReturnValueOnce(mockStream);

            const data = await storage.retrieve(mockCid);

            expect(mockIpfs.cat).toHaveBeenCalledWith(mockCid);
            expect(data).toEqual(mockData);
        });
    });

    describe('update', () => {
        it('updates data successfully', async () => {
            const mockData = { test: 'updated-data' };
            const mockCid = CID.parse('test-cid');
            const mockNewCid = { toString: () => 'new-cid' };
            mockIpfs.add.mockResolvedValueOnce({ cid: mockNewCid });

            const newCid = await storage.update(mockCid, mockData);

            expect(mockIpfs.pin.rm).toHaveBeenCalledWith(mockCid);
            expect(mockIpfs.add).toHaveBeenCalledWith(JSON.stringify(mockData));
            expect(newCid).toBeInstanceOf(CID);
        });
    });

    describe('delete', () => {
        it('deletes data successfully', async () => {
            const mockCid = CID.parse('test-cid');

            await storage.delete(mockCid);

            expect(mockIpfs.pin.rm).toHaveBeenCalledWith(mockCid);
        });
    });
}); 