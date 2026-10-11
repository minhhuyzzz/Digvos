export interface IMapper<Domain, Persistence, Response> {
  toDomain(raw: Persistence): Domain;
  toPersistence(domain: Domain): Persistence;
  toResponse(domain: Domain): Response;
}
