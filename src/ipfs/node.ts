import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

export interface IPFSConfig {
    host: string;
    port: number;
    protocol: 'http' | 'https';
    headers?: Record<string, string>;
}

export class IPFSNode {
    private client: any;
    private config: IPFSConfig;

    constructor(config: IPFSConfig) {
        this.config = config;
        this.client = create({
            host: config.host,
            port: config.port,
            protocol: config.protocol,
            headers: config.headers,
        });
    }

    async add(data: string | Buffer): Promise<string> {
        try {
            const result = await this.client.add(data);
            return result.path;
        } catch (error) {
            console.error('Error adding data to IPFS:', error);
            throw error;
        }
    }

    async get(cid: string): Promise<Buffer> {
        try {
            const stream = this.client.cat(cid);
            const chunks = [];
            for await (const chunk of stream) {
                chunks.push(chunk);
            }
            return Buffer.concat(chunks);
        } catch (error) {
            console.error('Error getting data from IPFS:', error);
            throw error;
        }
    }

    async pin(cid: string): Promise<void> {
        try {
            await this.client.pin.add(cid);
        } catch (error) {
            console.error('Error pinning CID:', error);
            throw error;
        }
    }

    async unpin(cid: string): Promise<void> {
        try {
            await this.client.pin.rm(cid);
        } catch (error) {
            console.error('Error unpinning CID:', error);
            throw error;
        }
    }

    async listPins(): Promise<string[]> {
        try {
            const pins = await this.client.pin.ls();
            return pins.map((pin: any) => pin.cid.toString());
        } catch (error) {
            console.error('Error listing pins:', error);
            throw error;
        }
    }
} 