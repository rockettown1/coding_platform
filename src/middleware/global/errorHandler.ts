import { errorHandler } from "../../lib/ErrorHandler";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../lib/CustomError";

const customErrorHandler = async (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await errorHandler.handleError(err);
};

export default customErrorHandler;
