#!/usr/bin/env node

const { execSync } = require("child_process");
const { readdir } = require("fs/promises");
const { FILES_PATH } = require("./utils/const");
const { execPrint } = require("./utils/execPrint");
const { copy } = require("./utils/copy");
const { isNextProject } = require("./utils/isNextProject");
const yesno = require("yesno");

const main = async () => {
	let nextProject = null;

	// Check if we're in a Node project
	try {
		execSync("ls package.json");

		nextProject = isNextProject();

		if (nextProject) {
			console.log("Next.js project found!");
		} else {
			console.log("Node.js project found!");
		}
	} catch {
		console.error(
			"ERROR: not in a Node.js project; move into a directory with a package.json"
		);
		process.exit(1);
	}

	// Conventional Commits prompt
	const useConventionalCommits = await yesno({
		question: "Do you want to use Conventional Commits?",
	});

	// Install packages
	try {
		execPrint("npm i -D typescript @types/node");

		if (nextProject) {
			execPrint("npm i -D @types/react @types/react-dom @next/font");
		} else {
			execPrint("npm i dotenv module-alias");
			execPrint("npm i -D @types/module-alias ts-node nodemon");
		}
	} catch {
		console.error("ERROR: could not install required packages.");
		process.exit(1);
	}

	// Install and configure Commitizen locally, if needed.
	if (useConventionalCommits) {
		try {
			execPrint("npm i -D @commitlint/cli @commitlint/config-conventional");
			execPrint(
				"npx --yes commitizen init cz-conventional-changelog --save-dev --force"
			);
		} catch {
			console.error(
				"ERROR: could not install and configure Conventional Commits."
			);
			process.exit(1);
		}
	}

	// Husky
	try {
		execPrint("git init");
		execPrint("npm i is-ci");
		execPrint("npm i -D husky");
		execPrint('npm pkg set scripts.prepare="is-ci || husky install"');
		execPrint("npm run prepare");
	} catch {
		console.error("ERROR: could not initialize git repo or Husky");
		process.exit(1);
	}

	// ESLint
	try {
		execPrint(
			"npm i -D lint-staged eslint eslint-config-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier"
		);

		if (nextProject) {
			execPrint("npm i -D eslint-config-next prettier-plugin-tailwindcss");
		}
	} catch {
		console.error("ERROR: could not install eslint configuration");
		process.exit(1);
	}

	// Configure package.json scripts
	try {
		if (!nextProject) {
			execPrint(
				`npm pkg set scripts.dev="nodemon --watch 'src/**' --ext 'js,ts,json' --exec 'ts-node src/index.ts'"`
			);
			execPrint('npm pkg set scripts.build="tsc"');
			execPrint(`npm pkg set scripts.lint="eslint --ext ts --fix ."`);
		}
	} catch {
		console.error("ERROR: could not configure package.json scripts.");
		process.exit(1);
	}

	// Configure Next project
	if (nextProject) {
		try {
			execPrint("rm -rf pages styles");

			// Install Tailwind
			execPrint("npm i -D tailwindcss postcss autoprefixer");
		} catch {
			console.error("ERROR: could not configure Next project.");
			process.exit(1);
		}
	}

	// Copy config files
	try {
		const files = await readdir(FILES_PATH);

		for (const file of files) {
			const dest = file.replace(/^dot_(.+)/, ".$1");

			try {
				// vero &&
				if (file === "commitlint.config.js" && !useConventionalCommits) {
					// Skip copy if file is Commitlint config and user has chosen to
					// setup the project without Conventional Commmits.
				} else {
					await copy(file, dest);
				}
			} catch (e) {
				console.error(`ERROR: could not copy ${file}: ${e}`);
			}
		}
	} catch (e) {
		console.error(
			"ERROR: could not copy files to project directory. Details below:"
		);
		console.error(e);
		process.exit(1);
	}

	console.log("\nDone!");
};

main().catch(console.error);
