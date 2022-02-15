# [@theedoran/bootstrap](https://github.com/theedoran/bootstrap)

> This package creates a `TypeScript` project from scratch, providing all the tools and configuration files needed to start write some code in a sensible way.

## Usage

Execute this command in a new (empty) directory:

```bash
npx @theedoran/bootstrap
```

_Done!_

## What it does

This script executes other scripts and copies various configurations, in order:

- It executes [@theedoran/tsconfig](https://github.com/theedoran/tsconfig);
- It installs [@theedoran/eslint-config](https://github.com/theedoran/eslint-config);
- It installs and configures [Husky](https://github.com/typicode/husky);
- It installs [dotenv](https://github.com/motdotla/dotenv), [module-alias](https://github.com/ilearnio/module-alias) as `dependencies` and [@commitlint/cli](https://github.com/conventional-changelog/commitlint), [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint), [lint-staged](https://github.com/okonet/lint-staged), [@types/module-alias](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/module-alias), [ts-node-dev](https://github.com/wclr/ts-node-dev) as `devDependencies`;
- It configures various `scripts` in `packages.json`, such as:

  - `dev` -> `ts-node-dev`;
  - `compile` -> `tsc`;
  - `commitlint`;
  - `lint-staged`;
  - `typecheck` -> `tsc --noemit`;
  - `lint` -> `npm run typecheck && eslint . --ext .js,.ts --no-cache`;
  - `lint:fix` -> `npm run lint -- --fix`;

- It copies all the [configuration files](https://github.com/theedoran/bootstrap/tree/main/files), for:
  - `Visual Studio Code`;
  - `Husky`;
  - `commitlint`;
  - `ESLint`;
  - `lint-staged`;
  - env vars (`.env.example`);
  - an `src` skeleton.

## License

This package is licensed under the [MIT License](https://opensource.org/licenses/MIT).
