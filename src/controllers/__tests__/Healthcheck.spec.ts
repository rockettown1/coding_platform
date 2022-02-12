import HealthCheckController from "../healthcheck";

describe("HealthCheck Controller", () => {
  const healthCheck = new HealthCheckController();
  it("should have the main path as /api", () => {
    expect(healthCheck.path).toEqual("/api");
  });

  it("should return all route objects when getRoutes method called", () => {
    expect(healthCheck.getRoutes[0].path).toEqual("/health");
  });
});
