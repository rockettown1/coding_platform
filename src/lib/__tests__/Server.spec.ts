import { Server } from "../Server";
import { Express } from "express";
import { Express as JestExpress } from "jest-express/lib/express";
import { TestController } from "../TestController";
import { errorHandler } from "../ErrorHandler";
import { CustomError } from "../CustomError";
import { Http } from "../constants/";

let server: Server;
let app: Express;
const mockController = new TestController();

const mockErrorHandler = {
  handleError: jest
    .spyOn(errorHandler, "handleError")
    .mockImplementation(async (err: CustomError) => {
      console.log(err);
    }),
  handleFatal: jest
    .spyOn(errorHandler, "handleFatal")
    .mockImplementation(async (err: CustomError) => {
      console.log(err);
    }),
};

beforeAll(() => {
  app = new JestExpress() as any as Express;
  server = new Server(app, "3000");
});

describe("Public API for Server class", () => {
  it("loadMiddleware method should be a function", () => {
    expect(typeof server.loadMiddleware).toBe("function");
  });
  it("loadControllers method should be a function", () => {
    expect(typeof server.loadControllers).toBe("function");
  });
  it("connectToDatabase method should be a function", () => {
    expect(typeof server.connectToDatabase).toBe("function");
  });
  it("serverStatic method should be a function", () => {
    expect(typeof server.serveStatic).toBe("function");
  });
  it("run method should be a function", () => {
    expect(typeof server.run).toBe("function");
  });
});

describe("loadMiddleware method", () => {
  it("should return undefined", () => {
    expect(server.loadMiddleware([])).toBeUndefined();
  });
  it("expects an array argument", () => {
    expect(() => server.loadMiddleware([])).not.toThrow();
  });
  it("should call handleError if no array passed", () => {
    // @ts-ignore
    server.loadMiddleware();
    expect(mockErrorHandler.handleError).toHaveBeenCalled();
  });

  it("should execute app.use x times when x middlewares given", () => {
    server.loadMiddleware(["m1", "m2", "m3"]);
    expect(app.use).toHaveBeenCalledTimes(3);
  });
});

describe("loadControllers method", () => {
  it("should return undefined", () => {
    expect(server.loadControllers([])).toBeUndefined();
  });
  it("expects an array argument", () => {
    expect(() => server.loadControllers([])).not.toThrow();
  });

  it("should call handleFatal if a controller in the stack doesn't conform", () => {
    //missing http method
    mockController.routes[0].method = Http.BLANK;
    server.loadControllers([mockController]);
    expect(mockErrorHandler.handleFatal).toHaveBeenCalled();
  });
});

describe("connectToDatabase method", () => {
  const mockedService = {
    connect: jest.fn(),
  };

  it("should call connect method on each service injected", () => {
    server.connectToDatabase([mockedService, mockedService]);
    expect(mockedService.connect).toHaveBeenCalledTimes(2);
  });
});

describe("run method", () => {
  it("should run app.listen when called", () => {
    server.run();
    expect(app.listen).toHaveBeenCalled();
  });
});
