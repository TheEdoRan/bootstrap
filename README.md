# [@theedoran/bootstrap](https://github.com/theedoran/bootstrap)

> This package creates a `TypeScript` project from scratch, providing all the tools and configuration files needed to start write some code in a sensible way.

## Next.js support

This package works for Next.js too! Just init a new project with:

```bash
npx create-next-app@latest --ts --use-npm
```

...and then execute the install command below.

## Usage

Init a new Node project if you haven't already done so (no need to do it for Next.js):

```bash
npm init -y
```

Then `cd` in the new directory, and execute this command:

```bash
npx @theedoran/bootstrap@latest
```

_Done!_

## What it does

This script executes other scripts and copies various configurations, in order:

- It installs and configures [Husky](https://github.com/typicode/husky);
- It installs:

  - Both envs: [typescript](https://github.com/microsoft/TypeScript), [@types/node](https://github.com/DefinitelyTyped/DefinitelyTyped), [@commitlint/cli](https://github.com/conventional-changelog/commitlint), [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint), [lint-staged](https://github.com/okonet/lint-staged), [eslint](https://github.com/eslint/eslint), [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier), [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser), [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin), [prettier](https://github.com/prettier/prettier) as `devDependencies`
  - Node only: [dotenv](https://github.com/motdotla/dotenv), [module-alias](https://github.com/ilearnio/module-alias) as `dependencies` and [@types/module-alias](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/module-alias), [ts-node](https://github.com/TypeStrong/ts-node), [nodemon](https://github.com/remy/nodemon) as `devDependencies`
  - Next.js only: [@types/react](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react), [@types/react-dom](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-dom), [eslint-config-next](https://github.com/vercel/next.js/tree/canary/packages/eslint-config-next), [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) as `devDependencies`

- It installs and configures [Commitizen](https://github.com/commitizen/cz-cli) with the [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog) adapter;

- It configures these two `scripts` in `packages.json` (Node only):

  - `dev` -> `nodemon --watch 'src/**' --ext 'js,ts,json' --exec 'ts-node src/index.ts'`
  - `build` -> `tsc`

- It copies all the [configuration files](https://github.com/theedoran/bootstrap/tree/main/files), for:
  - `Visual Studio Code`
  - `TypeScript`
  - `Husky`
  - `Prettier`
  - `ESLint`
  - `Commitlint`
  - `lint-staged`
  - env vars (`.env.example`)
  - an `src` skeleton

## License

This package is licensed under the [MIT License](https://opensource.org/licenses/MIT).
