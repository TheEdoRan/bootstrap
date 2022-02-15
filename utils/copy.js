const { resolve } = require("path");
const { cp } = require("fs/promises");
const { FILES_PATH } = require("./const");

const copy = (relativeSource, destination) =>
  cp(resolve(FILES_PATH, relativeSource), resolve(process.cwd(), destination), {
    recursive: true,
  });

module.exports = {
  copy,
};
