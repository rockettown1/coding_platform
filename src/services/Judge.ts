import { promises as fs } from "fs";
import { testCases } from "../utils/testCases";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";

/**
 * Judges the users code against predefined test cases
 */
export class Judge {
  private vmstr = `
  //this has been injected!
  import { NodeVM } from "vm2";
  
  const vm = new NodeVM({
    sandbox: { hi: "hello" },
    require: {
      external: true,
      builtin: [],
      root: "./",
    },
  });
  
  //inject
  
  const mod = vm.run(\`
  module.exports = {
    testCode: \${testFunc}
  }
  
  \`);
  `;

  private async writer(id: string, strFunc: string, problem: string) {
    const modStrFunc = strFunc.replace(problem, "testFunc");
    const injectVM = this.vmstr.replace("//inject", modStrFunc);
    const injectFunc = testCases[problem].test.replace("//inject", injectVM);
    await fs.writeFile(`./temp/${id}.test.ts`, injectFunc);
  }

  /**
   * Takes a users code and executes Jest against a test case for a specific problem, creating a temporary test file and results json file.
   * @param id
   * @param strFunc
   * @param problem
   * @returns {child, timeout} the child process stream to get results from Jest, and a timeout function
   */
  async scriptRunner(id: string, strFunc: string, problem: string) {
    let result: ChildProcessWithoutNullStreams;
    try {
      await this.writer(id, strFunc, problem);

      result = spawn(
        "jest",
        `./temp/${id}.test.ts --json --useStderr --outputFile=./temp/${id}.testresults.json`.split(
          " "
        ),
        {
          detached: true,
          shell: true,
        }
      );

      //handle timeout for long running process (ie catch infinite loops)
      let timeout = setTimeout(() => {
        try {
          result.kill();
        } catch (error) {
          console.log("Can't kill process");
        }
      }, 7000);

      return { child: result, timeout: timeout };
    } catch (err) {
      console.log("An error has occurred trying to run the test script", err);
    }
  }
}

export const judge = new Judge();
