import { errorHandler } from "../ErrorHandler";
import { logger } from "../../services/Logger";
import CustomError from "../CustomError";

jest.mock("../../services/Logger", () => {
  return {
    logger: {
      error: jest.fn(() => {}),
      debug: jest.fn(() => {}),
      fatal: jest.fn(() => {}),
    },
  };
});

const err: CustomError = {
  message: "this is a test error",
  name: "Test Error",
  httpCode: 0,
};

describe("ErrorHandler class public API", () => {
  it("handleError method should be a function", () => {
    expect(typeof errorHandler.handleError).toBe("function");
  });
  it("handleDebug method should be a function", () => {
    expect(typeof errorHandler.handleDebug).toBe("function");
  });
  it("handleFatal method should be a function", () => {
    expect(typeof errorHandler.handleFatal).toBe("function");
  });
});

describe("handleError method", () => {
  it("should call the error method in the Logger class", () => {
    errorHandler.handleError(err);
    expect(logger.error).toHaveBeenCalled();
  });
});
describe("handleDebug method", () => {
  it("should call the debug method in the Logger class", () => {
    errorHandler.handleDebug(err);
    expect(logger.debug).toHaveBeenCalled();
  });
});
describe("handleFatal method", () => {
  // @ts-ignore
  jest.spyOn(process, "exit").mockImplementation();
  it("should call the fatal method in the Logger class", () => {
    errorHandler.handleFatal(err);
    expect(logger.fatal).toHaveBeenCalled();
  });
});
