import { CID } from 'multiformats/cid';
import { create } from 'ipfs-http-client';

export class Storage {
    private ipfs: any;

    constructor() {
        this.ipfs = create({ url: process.env.IPFS_API_URL || 'http://localhost:5001' });
    }

    async store(data: any): Promise<CID> {
        const result = await this.ipfs.add(JSON.stringify(data));
        return CID.parse(result.cid);
    }

    async retrieve(cid: CID): Promise<any> {
        const stream = this.ipfs.cat(cid);
        let data = '';
        for await (const chunk of stream) {
            data += chunk.toString();
        }
        return JSON.parse(data);
    }

    async update(cid: CID, data: any): Promise<CID> {
        await this.delete(cid);
        return this.store(data);
    }

    async delete(cid: CID): Promise<void> {
        // Note: IPFS doesn't support deletion, but we can mark the content as unpinned
        await this.ipfs.pin.rm(cid);
    }
} 