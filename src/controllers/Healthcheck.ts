import { Controller } from "../lib/Controller";
import { Request, Response, NextFunction } from "express";
import { Http, Paths } from "../lib/constants";

export class HealthCheckController extends Controller {
  public path: string = Paths.api;
  protected routes = [
    {
      path: Paths.health,
      method: Http.GET,
      handler: this.checkApi,
      localMiddleware: [],
    },
  ];

  private checkApi(_: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).send({ message: "Everything looks OK to me!" });
    } catch (error) {
      next(error);
    }
  }

  public get getRoutes() {
    return this.routes;
  }
}
