import { logger } from "../services/Logger";
import { CustomError } from "./CustomError";

class ErrorHandler {
  async handleError(err: CustomError) {
    logger.error(
      "Error message from the centralized error-handling component",
      err
    );
  }

  async handleDebug(err: CustomError) {
    logger.debug("Something went wrong", err);
  }
  async handleFatal(err: CustomError) {
    await logger.fatal("Something went very wrong", err);
    console.log("Server was unable to start because of the above error");
    process.exit(1);
  }
}

export const errorHandler = new ErrorHandler();
