const { execSync } = require("child_process");

const isNextProject = () => {
	try {
		execSync("npm list next");
		return true;
	} catch {
		return false;
	}
};

module.exports = {
	isNextProject,
};
