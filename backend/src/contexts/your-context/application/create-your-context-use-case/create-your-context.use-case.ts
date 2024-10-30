import { Injectable } from "@/shared/dependency-injection/injectable";

import {
  PrimitiveYourContext,
  YourContext,
} from "@/contexts/your-context/domain/your-context.entity";
import { YourContextRepository } from "@/contexts/your-context/domain/your-context.repository";

import { CreateYourContextDto } from "./create-your-context.dto";

@Injectable()
export class CreateYourContextUseCase {
  constructor(private readonly yourContextRepository: YourContextRepository) {}

  async run(
    dto: CreateYourContextDto,
  ): Promise<{ payment: PrimitiveYourContext }> {
    const payment = YourContext.create({
      name: dto.name,
    });

    await this.yourContextRepository.save(payment);

    return {
      payment: payment.toPrimitives(),
    };
  }
}
