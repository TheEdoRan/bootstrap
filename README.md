# [@theedoran/bootstrap](https://github.com/theedoran/bootstrap)

> This package creates a `TypeScript` project from scratch, providing all the tools and configuration files needed to start write some code in a sensible way.

## ‼️ Next.js support

This package works for Next.js too! Just init a new project with:

```bash
npx create-next-app@latest --ts --use-npm
```

And then execute the command below.

**Documentation for Next.js support is still WIP**.

---

## Usage

Execute this command in a new (empty) directory:

```bash
npx @theedoran/bootstrap@latest
```

_Done!_

## What it does

This script executes other scripts and copies various configurations, in order:

- It executes [@theedoran/tsconfig](https://github.com/theedoran/tsconfig);
- It installs [@theedoran/eslint-config](https://github.com/theedoran/eslint-config);
- It installs and configures [Husky](https://github.com/typicode/husky);
- It installs [dotenv](https://github.com/motdotla/dotenv), [module-alias](https://github.com/ilearnio/module-alias) as `dependencies` and [@commitlint/cli](https://github.com/conventional-changelog/commitlint), [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint), [lint-staged](https://github.com/okonet/lint-staged), [@types/module-alias](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/module-alias), [ts-node](https://github.com/TypeStrong/ts-node), [nodemon](https://github.com/remy/nodemon) as `devDependencies`;
- It configures these two `scripts` in `packages.json`:

  - `dev` -> `nodemon --watch 'src/**' --ext 'js,ts,json' --exec 'ts-node src/index.ts'`;
  - `build` -> `tsc`;

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
