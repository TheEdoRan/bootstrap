const { execSync } = require("child_process");

const execPrint = (command) => execSync(command, { stdio: "inherit" });

module.exports = {
  execPrint,
};
