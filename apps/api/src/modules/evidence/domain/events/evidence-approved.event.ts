import { IDomainEvent } from '../../../../common/core/domain-event';

export class EvidenceApprovedEvent implements IDomainEvent {
  public readonly occurredAt: Date = new Date();

  constructor(
    public readonly submissionId: string,
    public readonly studentId: string,
    public readonly competencyId: string,
    public readonly score: number,
    public readonly feedback: string,
    public readonly tenantId: string,
  ) {}

  getAggregateId(): string {
    return this.submissionId;
  }
}
