import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ICertificateRepository } from '../domain/repositories/certificate.repository.interface';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class CertificateService {
  constructor(
    @Inject('ICertificateRepository')
    private readonly certificateRepository: ICertificateRepository,
    private readonly configService: ConfigService,
  ) {}

  async getCertificate(id: string): Promise<any> {
    const cert = await this.certificateRepository.findCertificateById(id);
    if (!cert) throw new NotFoundException(`Certificate with ID '${id}' not found`);
    return cert;
  }

  /**
   * Verify certificate on-chain and retrieve detailed metadata
   */
  async verifyCertificate(verificationCode: string): Promise<any> {
    const certificate = await this.certificateRepository.findCertificateByVerificationCode(verificationCode);
    if (!certificate) {
      throw new NotFoundException(`Certificate with verification code '${verificationCode}' not found`);
    }

    let onChainOwner: string | null = null;
    let onChainValid = false;
    let onChainUri: string | null = null;
    let metadataIntegrityVerified = false;

    // Real or mock on-chain verification based on contract address and tokenId
    if (certificate.tokenId && certificate.status === 'ISSUED') {
      const isMock = this.configService.get<string>('BLOCKCHAIN_MOCK', 'true') === 'true';
      if (isMock) {
        onChainValid = true;
        onChainOwner = certificate.student.walletAddress || 
          '0x' + crypto.createHash('sha256').update(certificate.studentId).digest('hex').substring(0, 40);
        onChainUri = `https://supabase.storage.digvos.vn/metadata/${certificate.verificationCode}.json`;
        metadataIntegrityVerified = true;
      } else {
        try {
          const rpcUrl = this.configService.get<string>('POLYGON_AMOY_RPC_URL');
          const contractAddress = this.configService.get<string>('SBT_CONTRACT_ADDRESS');
          if (rpcUrl && contractAddress) {
            const { ethers } = require('ethers');
            const provider = new ethers.JsonRpcProvider(rpcUrl);
            const abi = [
              'function ownerOf(uint256 tokenId) view returns (address)',
              'function tokenURI(uint256 tokenId) view returns (string)',
            ];
            const contract = new ethers.Contract(contractAddress, abi, provider);
            
            onChainOwner = await contract.ownerOf(certificate.tokenId);
            onChainUri = await contract.tokenURI(certificate.tokenId);

            const expectedWallet = certificate.student.walletAddress || 
              '0x' + crypto.createHash('sha256').update(certificate.studentId).digest('hex').substring(0, 40);
            
            if (onChainOwner && onChainOwner.toLowerCase() === expectedWallet.toLowerCase()) {
              onChainValid = true;
            }

            // Verify metadata file integrity from on-chain URI
            if (onChainUri) {
              const axios = require('axios');
              const response = await axios.get(onChainUri);
              if (response.status === 200 && response.data) {
                const onChainMetadata = response.data;
                const dbHash = (certificate.metadata as any)?.hash;
                if (dbHash && onChainMetadata.hash === dbHash) {
                  metadataIntegrityVerified = true;
                }
              }
            }
          }
        } catch (e) {
          onChainValid = false;
        }
      }
    }

    return {
      success: true,
      isValid: certificate.isValid && onChainValid && metadataIntegrityVerified,
      verificationCode,
      certificate,
      onChainVerify: {
        valid: onChainValid,
        owner: onChainOwner,
        tokenUri: onChainUri,
        metadataIntegrity: metadataIntegrityVerified,
        contractAddress: this.configService.get<string>('SBT_CONTRACT_ADDRESS', '0xMockContractAddress'),
      },
    };
  }

  /**
   * List certificates for a student
   */
  async getStudentCertificates(userId: string): Promise<any[]> {
    const profile = await (this.certificateRepository as any).prisma.studentProfile.findUnique({
      where: { userId },
    });
    if (!profile) return [];

    return (this.certificateRepository as any).prisma.certificate.findMany({
      where: { studentId: profile.id },
      include: {
        competency: {
          include: { area: true },
        },
      },
    });
  }
}
