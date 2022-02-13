import express, { Express } from "express";
import { IController, IDatabase } from "./Types";
import { logs } from "./constants/logging";
import { errorHandler } from "./ErrorHandler";
import { CustomError } from "./CustomError";

/**
 * Server Class: Instantiates new Express server
 * @description Loads middleware, controllers, databases, and listens for incoming requests
 *
 */
export class Server {
  public readonly app: Express;
  private port: string | undefined;

  constructor(app: Express, port: string | undefined) {
    this.app = app;
    this.port = port;
  }

  /**
   * Loads global middleware
   * @param middleware
   */
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

  /**
   * Loads controller objects
   * @param controllers
   */
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

  /**
   * Connects to database objects
   * @param databaseServices
   */
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

  /**
   * Serves static directories
   * @param name
   * @param folder
   */
  public serveStatic(name: string, path: string, folder: string) {
    try {
      this.app.use(`${path}`, express.static(folder));
      console.log(logs.static_success(name, folder));
    } catch (err) {
      console.log(logs.static_fail);
      errorHandler.handleError(err as CustomError);
    }
  }

  /**
   * Starts the server and listens for incoming requests
   * @returns listening message in the console
   */
  public run() {
    return this.app.listen(this.port, () => {
      console.log(logs.listening(this.port));
    });
  }
}
