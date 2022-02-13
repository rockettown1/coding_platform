import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { writer } from "./writer";

export const scriptRunner = async (
  id: string,
  strFunc: string,
  problem: string
) => {
  let result: ChildProcessWithoutNullStreams;
  try {
    await writer(id, strFunc, problem);

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

    //testing
    result.stderr.on("data", (data) => {
      console.log(data.toString());
    });

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
};
