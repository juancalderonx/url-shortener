import { HealthController } from "@/app/http-api/health/health.controller";

describe("HealthController", () => {
  let healthController: HealthController;

  beforeEach(() => {
    healthController = new HealthController();
  });

  describe("run", () => {
    it("should return is healthy", () => {
      expect(healthController.run()).toEqual({ status: "ok" });
    });
  });
});
