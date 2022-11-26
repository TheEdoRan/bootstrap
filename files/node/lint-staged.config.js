module.exports = {
	"**/*.ts": () => [
		"tsc -p tsconfig.json --noEmit",
		"eslint . --no-cache --fix",
	],
};
