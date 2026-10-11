import { IDomainEvent } from '../../../../common/core/domain-event';
import { ProficiencyLevel } from '@digvos/database';

export class CompetencyAchievedEvent implements IDomainEvent {
  public readonly occurredAt: Date = new Date();

  constructor(
    public readonly studentId: string,
    public readonly competencyId: string,
    public readonly level: ProficiencyLevel,
    public readonly tenantId: string,
  ) {}

  getAggregateId(): string {
    return `${this.studentId}_${this.competencyId}_${this.level}`;
  }
}
