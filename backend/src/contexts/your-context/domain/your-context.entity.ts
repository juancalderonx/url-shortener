import { v4 as uuidv4 } from "uuid";

export interface PrimitiveYourContext {
  id: string;
  name: string;
}

export class YourContext {
  constructor(private attributes: PrimitiveYourContext) {}

  static create(dto: { name: string }): YourContext {
    const id: string = uuidv4();
    return new YourContext({
      id,
      name: dto.name,
    });
  }

  toPrimitives(): PrimitiveYourContext {
    return {
      id: this.attributes.id,
      name: this.attributes.name,
    };
  }
}
