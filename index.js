#!/usr/bin/env node

const { resolve } = require("path");
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
		execPrint('npm set-script prepare "husky install"');
		execPrint("npm run prepare");
	} catch {
		console.error("ERROR: could not initialize git repo or Husky");
		process.exit(1);
	}

	// Install additional packages
	try {
		execPrint(
			"npm i -D @commitlint/cli @commitlint/config-conventional lint-staged"
		);

		if (!isNextProject()) {
			execPrint("npm i dotenv module-alias");
			execPrint("npm i -D @types/module-alias ts-node-dev");
		}
	} catch {
		console.error("ERROR: could not install additional required packages.");
		process.exit(1);
	}

	// Configure package.json scripts
	try {
		execPrint('npm set-script commitlint "commitlint"');
		execPrint('npm set-script lint-staged "lint-staged"');
		execPrint('npm set-script typecheck "tsc --noemit"');
		execPrint('npm set-script lint:fix "npm run lint -- --fix"');

		if (!isNextProject()) {
			execPrint('npm set-script dev "ts-node-dev --rs ./src/index.ts"');
			execPrint('npm set-script compile "tsc"');
			execPrint(
				'npm set-script lint "npm run typecheck && eslint . --ext .js,.ts --no-cache"'
			);
		} else {
			execPrint(
				'npm set-script lint "npm run typecheck && eslint . --ext .js,.ts,.jsx,.tsx --no-cache"'
			);
		}
	} catch {
		console.error("ERROR: could not configure package.json scripts.");
		process.exit(1);
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
		console.error(
			"ERROR: could not copy files to project directory. Details below:"
		);
		console.error(e);
		process.exit(1);
	}
};

main().catch(console.error);
