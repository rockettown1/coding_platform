import express, { Express } from "express";
import { IController, IDatabase } from "./Types";
import { logs } from "./constants/logging";
import { errorHandler } from "./ErrorHandler";
import CustomError from "./CustomError";

export default class Server {
  public readonly app: Express;
  private port: string | undefined;

  constructor(app: Express, port: string | undefined) {
    this.app = app;
    this.port = port;
  }

  public loadMiddleware(middleware: any[]) {
    try {
      middleware.forEach((mw) => {
        this.app.use(mw);
      });
      console.log(logs.mw_success);
    } catch (err) {
      console.log(logs.mw_fail);
      errorHandler.handleError(err as CustomError);
    }
  }

  public loadControllers(controllers: IController[]) {
    try {
      controllers.forEach((controller) => {
        this.app.use(controller.path, controller.setRoutes());
      });
      console.log(logs.ctr_success);
    } catch (error) {
      console.log(logs.ctr_fail);
      errorHandler.handleFatal(error as CustomError);
    }
  }

  public async connectToDatabase(databaseServices: IDatabase[]) {
    try {
      databaseServices.forEach(async (service) => {
        await service.connect();
      });
    } catch (err) {
      console.log(err);
      errorHandler.handleError(err as CustomError);
    }
  }

  public serveStatic(name: string, folder: string) {
    try {
      this.app.use("/", express.static(folder));
      console.log(logs.static_success(name, folder));
    } catch (err) {
      console.log(logs.static_fail);
      errorHandler.handleError(err as CustomError);
    }
  }

  public run() {
    return this.app.listen(this.port, () => {
      console.log(logs.listening(this.port));
    });
  }
}
