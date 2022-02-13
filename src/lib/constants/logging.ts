import chalk from "chalk";
//need to replace this with a logging module but has basic functionality
export const logs = {
  mw_success: chalk.bgGreen.black(" - Global middleware has been loaded "),
  mw_fail: chalk.bgRed.black(" - Unable to load middleware "),
  ctr_success: chalk.bgGreen.black(" - Controllers have been loaded "),
  ctr_fail: chalk.bgRed.black(" - Unable to load controllers "),
  static_success: (name: string, folder: string) =>
    chalk.bgGreen.black(` - Serving ${name} from ${folder} directory `),
  static_fail: (folder: string) =>
    chalk.bgRed.black(` - Unable to serve static files from ${folder} `),
  listening: (port: string | undefined) =>
    chalk.bgBlue.black(` - Server is listening on port ${port} 🚀 `),
  db_success: (dbName: string) =>
    chalk.bgCyan.black(` - Connected to ${dbName} `),
  db_fail: (dbName: string) =>
    chalk.bgRed.black(` - Unable to connect to ${dbName} `),
};
