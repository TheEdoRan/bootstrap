module.exports = {
	"**/*.ts?(x)": () => [
		"tsc -p tsconfig.json --noEmit",
		"eslint . --no-cache --fix",
	],
};
