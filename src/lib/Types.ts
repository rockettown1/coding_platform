import { Request, Response, NextFunction, Router } from "express";

export type RouteObject = {
  path: string;
  method: string;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  localMiddleware: any[];
};

export interface IController {
  path: string;
  setRoutes: () => Router;
}

export interface IDatabase {
  connect: () => void;
}
