const { resolve } = require("path");
const { isNextProject } = require("./isNextProject");

const FILES_PATH = resolve(
	__dirname,
	"..",
	"files",
	isNextProject() ? "next" : "node"
);

module.exports = {
	FILES_PATH,
};
