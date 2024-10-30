/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from "@/shared/dependency-injection/injectable";

import {
  PrimitiveYourContext,
  YourContext,
} from "@/contexts/your-context/domain/your-context.entity";
import { YourContextRepository } from "@/contexts/your-context/domain/your-context.repository";

@Injectable()
export class InMemoryYourContextRepository extends YourContextRepository {
  private yourContexts: PrimitiveYourContext[] = [];

  async save(yourContext: YourContext): Promise<void> {
    this.yourContexts.push(yourContext.toPrimitives());
  }
}
