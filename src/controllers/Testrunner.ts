import { Controller } from "../lib/Controller";
import { Request, Response } from "express";
import { Http, Paths } from "../lib/constants";
import { scriptRunner } from "../utils/scriptRunner";
import fs from "fs";

export class TestRunnerController extends Controller {
  public path: string = Paths.root;
  protected routes = [
    {
      path: Paths.testresult,
      method: Http.POST,
      handler: this.runTests,
      localMiddleware: [],
    },
  ];

  private async runTests(req: Request, res: Response) {
    const { id, code, problemName } = req.body;
    res.header("Content-Type", "application/json");
    const result = await scriptRunner(id, code, problemName);

    if (result) {
      result.child.stderr.on("data", (data) => {
        console.log(data.toString());
      });

      result.child.on("exit", (code) => {
        if (code === 0 || code === 1) {
          const buffer = fs.readFileSync(`./temp/${id}.testresults.json`);
          const data = buffer.toString();
          res.status(200).send(data);
        } else {
          res.status(200).send({ message: "Timedout" });
        }

        clearTimeout(result.timeout);
      });
    } else {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }

  public get getRoutes() {
    return this.routes;
  }
}
