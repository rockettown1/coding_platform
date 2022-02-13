export const vmstr = `
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
