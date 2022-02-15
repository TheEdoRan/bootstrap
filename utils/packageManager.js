const which = require("which");

const has = (bin) => which.sync(bin, { nothrow: true });
const getPackageManager = () => has("pnpm") || has("npm");

module.exports = {
	getPackageManager,
};
