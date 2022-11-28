module.exports = {
	"**/*.ts": (filenames) => [
		"tsc -p tsconfig.json --noEmit",
		`eslint --no-cache --fix --ext .ts ${filenames.join(" ")}`,
	],
};
