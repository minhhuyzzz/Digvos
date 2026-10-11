import { IDomainEvent } from '../../../../common/core/domain-event';

export class AIGradingCompletedEvent implements IDomainEvent {
  public readonly occurredAt: Date = new Date();

  constructor(
    public readonly submissionId: string,
    public readonly score: number,
    public readonly feedback: string,
    public readonly status: 'PASSED' | 'FAILED' | 'NEEDS_REVIEW',
    public readonly tenantId: string,
  ) {}

  getAggregateId(): string {
    return this.submissionId;
  }
}
