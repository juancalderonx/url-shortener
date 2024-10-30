import { YourContext } from "@/contexts/your-context/domain/your-context.entity";

export abstract class YourContextRepository {
  abstract save(payment: YourContext): Promise<void>;
}
