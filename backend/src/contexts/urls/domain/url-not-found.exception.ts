export class UrlNotFoundException extends Error {
  constructor(public readonly id: string) {
    super(`Url not found with id: ${id}`);
  }
}
