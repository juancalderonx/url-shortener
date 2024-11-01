import { v4 as uuidv4 } from "uuid";

export interface PrimitiveUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
  expiresAt: Date | null;
}

export class Url {
  constructor(private attributes: PrimitiveUrl) {}

  static create(dto: {
    originalUrl: string;
    shortUrl: string;
    userId: string;
    createdAt: Date;
    expiresAt: Date;
  }): Url {
    const id: string = uuidv4();
    return new Url({
      id,
      ...dto,
      updatedAt: null,
    });
  }

  toPrimitive(): PrimitiveUrl {
    return this.attributes;
  }
}
