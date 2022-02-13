import { promises as fs } from "fs";
import { vmstr } from "./vmstr";
import { testCases } from "./testCases";

export const writer = async (id: string, strFunc: string, problem: string) => {
  const modStrFunc = strFunc.replace(problem, "testFunc");
  const injectVM = vmstr.replace("//inject", modStrFunc);
  const injectFunc = testCases[problem].test.replace("//inject", injectVM);
  await fs.writeFile(`./temp/${id}.test.ts`, injectFunc);
};
