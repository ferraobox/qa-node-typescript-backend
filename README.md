### Latest - ![Release](https://img.shields.io/github/v/release/ferraobox/qa-node-typescript-backend)

### CI result - [![CI - Test](https://github.com/ferraobox/qa-node-typescript-backend/actions/workflows/release.yml/badge.svg)](https://github.com/ferraobox/qa-node-typescript-backend/actions/workflows/release.yml)

### Code Climate - ![Code Climate coverage](https://img.shields.io/codeclimate/coverage/ferraobox/qa-node-typescript-backend)

# PETSTORE NODEJS TYPESCRIPT

This project is a little template that how to make the diferent testing layers in node backend.

Quality there are not only on the test, the processes are important, on the following link you can se a litle list of basic checks:

- Code coverage with code climate and jest
- Branch protection
  - PR reviews are mandatories with template (Defined on Github project)
  - Husky pre hooks, run linter on pre-commit hook
- Run test on Github actions CI - Release Workflow
- Custom .eslintrc.json configuration for preserve the code quality

### Prerequisites

Docker Desktop installed and Node 14 or higher

## API testing project

You should do the following steps:

On Terminal into project path:

```
> npm i
> npm run test
```

### Github tools

- Github actions for automating the release
- Pull request tempplate

A list of test cases proposed for automation:

- You can see all test cases into the reports folder, you just need to open the .html file.

A short explanation of the provided solution.

- I've use Typescript because is an oriented and typed language with an easy way to build, configure and launch whatever thing you want to do.
- I use Jest as test runner because is a delightful Testing Framework with a focus on simplicity.

The reports are located on reports folder into api project.

### Artifacts

The Artifacts are on workflow action section.

https://github.com/ferraobox/qa-node-typescript-backend/actions/

you can check them opening the specific run.
