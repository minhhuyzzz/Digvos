import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BlockchainService {
  private readonly logger = new Logger(BlockchainService.name);

  constructor(private readonly configService: ConfigService) {}

  async mintSoulboundToken(
    recipientAddress: string,
    metadataUri: string
  ): Promise<{ transactionHash: string; blockNumber: number; tokenId: string }> {
    const isMock = this.configService.get<string>('BLOCKCHAIN_MOCK', 'true') === 'true';

    if (isMock) {
      const mockTxHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const mockBlockNumber = Math.floor(Math.random() * 1000000) + 50000000;
      const mockTokenId = Math.floor(Math.random() * 1000000).toString();

      this.logger.log(`[Simulated Polygon] Minted SBT to ${recipientAddress}. TxHash: ${mockTxHash}`);
      return {
        transactionHash: mockTxHash,
        blockNumber: mockBlockNumber,
        tokenId: mockTokenId,
      };
    }

    // Thực tế sẽ dùng ethers / viem kết nối RPC node của Alchemy
    throw new Error('Real blockchain connection not implemented yet. Set BLOCKCHAIN_MOCK=true');
  }
}
