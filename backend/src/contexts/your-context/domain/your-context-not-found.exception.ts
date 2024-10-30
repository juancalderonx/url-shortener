export class YourContextNotFoundException extends Error {
  constructor(public readonly id: string) {
    super(`Your context not found ${id}`);
  }
}
