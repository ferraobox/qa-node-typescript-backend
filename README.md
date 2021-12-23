![TypeScript](https://img.shields.io/badge/-TypeScript-000?&logo=TypeScript)
![Node](https://img.shields.io/badge/-NodeJs-000?&logo=node-dot-js)
![npm](https://img.shields.io/badge/-npm-000?&logo=npm)
![MongoDB](https://img.shields.io/badge/-MongoDB-000?&logo=mongodb)
![Jest](https://img.shields.io/badge/-jest-000?&logo=jest)
![eslint](https://img.shields.io/badge/-eslint-000?&logo=eslint)
![GitHubActions](https://img.shields.io/badge/-GitHubActions-000?&logo=github-actions)
![CodeClimate](https://img.shields.io/badge/-CodeClimate-000?&logo=code-climate)

---

![Release](https://img.shields.io/github/v/release/ferraobox/qa-node-typescript-backend)
[![CI - Test](https://github.com/ferraobox/qa-node-typescript-backend/actions/workflows/pr.review.example.yml/badge.svg)](https://github.com/ferraobox/qa-node-typescript-backend/actions/workflows/pr.review.example.yml)
<a href="https://codeclimate.com/github/ferraobox/qa-node-typescript-backend/maintainability"><img src="https://api.codeclimate.com/v1/badges/5a082c37dea0dd86f4a6/maintainability" /></a>
<a href="https://codeclimate.com/github/ferraobox/qa-node-typescript-backend/test_coverage"><img src="https://api.codeclimate.com/v1/badges/5a082c37dea0dd86f4a6/test_coverage" /></a>

#### Requirements Coverage

A good point is calculate Requirements coverage, if you define all use cases on test controllers (INT or E2E) you can calculate if your test are passing throw all logic (As in UNIT tests with code climate but with INT or e2e tests as well).

![Use cases coverage](https://img.shields.io/codeclimate/coverage/ferraobox/qa-node-typescript-backend)

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
> npm run test:unit
> npm run test:contract:consumer
> npm run test:contract:provider
> npm run test:int
> npm run test:specification
```

### CI Checks

To simulate the PR review pipeline, I've changed the webhook event for master branch push.
![Alt text](pr-review.png?raw=true 'R Checks')

### Github tools

- Github actions for automating the release
- Pull request tempplate (with all checks)

A list of test cases proposed for automation:

- You can see all test cases into the reports folder, you just need to open the .html file.

A short explanation of the provided solution.

- I've use Typescript because is an oriented and typed language with an easy way to build, configure and launch whatever thing you want to do.
- I use Jest as test runner because is a delightful Testing Framework with a focus on simplicity.

The reports are located on reports folder into api project.

### Artifacts

The Artifacts are on workflow action section.

https://github.com/ferraobox/qa-node-typescript-backend/actions/

you can check them opening the specific run
