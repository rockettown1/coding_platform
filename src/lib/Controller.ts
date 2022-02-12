import { Router } from "express";
import { RouteObject } from "./Types";
import CustomError from "./CustomError";
import { Errors, HttpStatusCode } from "./constants/";

export default abstract class Controller {
  public router = Router();
  protected routes: RouteObject[];
  public path: string;

  setRoutes() {
    for (const route of this.routes) {
      for (const mw of route.localMiddleware) {
        this.router.use(route.path, mw);
      }
      switch (route.method) {
        case "GET":
          this.router.get(route.path, route.handler);
          break;
        case "POST":
          this.router.post(route.path, route.handler);
          break;
        case "PATCH":
          this.router.put(route.path, route.handler);
          break;
        case "DELETE":
          this.router.delete(route.path, route.handler);
          break;
        default:
          throw new CustomError(
            "Http verb is missing or not spelled correctly. Check your controller.",
            Errors.ctr_error,
            HttpStatusCode.INTERNAL_SERVER
          );
      }
    }
    return this.router;
  }
}
