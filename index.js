#!/usr/bin/env node

const { readdir } = require("fs/promises");
const { FILES_PATH } = require("./utils/const");
const { execPrint } = require("./utils/execPrint");
const { copy } = require("./utils/copy");
const { isNextProject } = require("./utils/isNextProject");

const main = async () => {
	// TypeScript/project initialization
	try {
		execPrint("npx @theedoran/tsconfig --no-questions");
	} catch {
		console.error("ERROR: could not execute @theedoran/tsconfig");
		process.exit(1);
	}

	// ESLint
	try {
		if (isNextProject()) {
			execPrint("npm uninstall -D eslint eslint-config-next");
			execPrint("npm i -D @theedoran/eslint-config-next");
		} else {
			execPrint("npm i -D @theedoran/eslint-config");
		}
	} catch {
		console.error("ERROR: could not install eslint configuration");
		process.exit(1);
	}

	// Husky
	try {
		execPrint("git init");
		execPrint("npm i -D husky");
		execPrint('npm pkg set scripts.prepare="husky install"');
		execPrint("npm run prepare");
	} catch {
		console.error("ERROR: could not initialize git repo or Husky");
		process.exit(1);
	}

	// Install additional packages
	try {
		execPrint("npm i -D @commitlint/cli @commitlint/config-conventional lint-staged");

		if (!isNextProject()) {
			execPrint("npm i dotenv module-alias");
			execPrint("npm i -D @types/module-alias ts-node nodemon");
		}
	} catch {
		console.error("ERROR: could not install additional required packages.");
		process.exit(1);
	}

	// Configure package.json scripts
	try {
		if (!isNextProject()) {
			execPrint(`npm pkg set scripts.dev="nodemon --watch 'src/**' --ext 'js,ts,json' --exec 'ts-node src/index.ts'"`);
			execPrint('npm pkg set scripts.build="tsc"');
		}
	} catch {
		console.error("ERROR: could not configure package.json scripts.");
		process.exit(1);
	}

	// Configure Next project.
	try {
		execPrint("rm -rf pages styles");

		// Install Tailwind.
		execPrint("npm i -D tailwindcss postcss autoprefixer");
	} catch {
		console.error("ERROR: could not configure Next project.");
	}

	// Copy config files
	try {
		const files = await readdir(FILES_PATH);

		for (const file of files) {
			const dest = file.replace(/^dot_(.+)/, ".$1");

			try {
				await copy(file, dest);
			} catch (e) {
				console.error(`ERROR: could not copy ${file}: ${e}`);
			}
		}
	} catch (e) {
		console.error("ERROR: could not copy files to project directory. Details below:");
		console.error(e);
		process.exit(1);
	}
};

main().catch(console.error);
