module.exports = {
	"**/*.ts?(x)": (filenames) => [
		"tsc -p tsconfig.json --noEmit",
		`eslint --no-cache --fix --ext .ts,.tsx ${filenames.join(" ")}`,
	],
};
