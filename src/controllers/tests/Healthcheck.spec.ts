import request from "supertest";
import express from "express";
import { Server } from "../../lib/Server";
import { HealthCheckController } from "../Healthcheck";

let healthRoute: HealthCheckController;

beforeAll(() => {
  healthRoute = new HealthCheckController();
});

describe("HealthCheck Controller", () => {
  it("should have the main path as /api", () => {
    expect(healthRoute.path).toEqual("/api");
  });

  it("should return all route objects when getRoutes method called", () => {
    expect(healthRoute.getRoutes[0].path).toEqual("/health");
  });

  it("should send json to endpoint /api/health", (done) => {
    const server = new Server(express(), "3000");
    server.loadControllers([healthRoute]);
    const s = server.run();

    request(server.app)
      .get("/api/health")
      .expect("Content-Type", /json/)
      .expect({ message: "Everything looks OK to me!" })
      .expect(200, done);

    s.close();
  });
});
