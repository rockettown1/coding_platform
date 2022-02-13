import { Controller } from "./Controller";
import { Http } from "./constants";

export class TestController extends Controller {
  public path: string = "/test";
  public routes = [
    {
      path: "/route",
      method: Http.GET,
      handler: jest.fn(),
      localMiddleware: [],
    },
  ];
  public get getRoutes() {
    return this.routes;
  }
}
