import request from "supertest";
import { deleteFiles } from "../../utils/deleteFiles";
import express from "express";
import { Server } from "../../lib/Server";
import { TestRunnerController } from "../Testrunner";

let testresultRoute: TestRunnerController;

beforeAll(() => {
  testresultRoute = new TestRunnerController();
});

afterAll(() => {
  deleteFiles(["./temp/id1.test.ts", "./temp/id1.testresults.json"]);
});

describe("TestRunner Controller", () => {
  it("endpoint should be mounted on the root path", () => {
    expect(testresultRoute.path).toEqual("/");
  });

  it("should post to /testresult and get test results back", async () => {
    const server = new Server(express(), "3001");
    server.loadMiddleware([express.json()]);
    server.loadControllers([testresultRoute]);
    const s = server.run();

    const testObj = {
      code: `function sumTwo(num1, num2){
        return num1 + num2
    }`,
      problemName: `sumTwo`,
      id: "id1",
    };

    const test = await request(server.app)
      .post("/testresult")
      .send(testObj)
      .type("application/json")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(test.body).toHaveProperty("testResults");
    s.close();
  });
});
