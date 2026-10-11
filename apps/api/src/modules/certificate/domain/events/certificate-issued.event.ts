import { IDomainEvent } from '../../../../common/core/domain-event';

export class CertificateIssuedEvent implements IDomainEvent {
  public readonly occurredAt: Date = new Date();

  constructor(
    public readonly certificateId: string,
    public readonly studentId: string,
    public readonly competencyId: string,
    public readonly level: string,
    public readonly tokenId: string,
    public readonly txHash: string,
    public readonly tenantId: string,
  ) {}

  getAggregateId(): string {
    return this.certificateId;
  }
}
