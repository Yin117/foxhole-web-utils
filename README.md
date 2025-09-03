# Foxhole Web Utils
[![pages-build-deployment](https://github.com/Yin117/foxhole-web-utils/actions/workflows/pages/pages-build-deployment/badge.svg?branch=main)](https://github.com/Yin117/foxhole-web-utils/actions/workflows/pages/pages-build-deployment) [![Deploy Next.js site to Pages](https://github.com/Yin117/foxhole-web-utils/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/Yin117/foxhole-web-utils/actions/workflows/deploy.yml)

## Application Available Below
[https://yin117.github.io/foxhole-web-utils/](https://yin117.github.io/foxhole-web-utils/)

---

This [Next.js](https://nextjs.org) project was bootstrapped with with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Working with NPM/etc

There are other tools like `npm` such as `yarn`, `pnpm`, and `bun` but for this project it used `npm`.

You'll need the following:
- [**npm**](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) aka 'Node Package Manager'
- [**Node**](https://nodejs.org/en/download) you'll likly need this too
- An **IDE** or "Intelligent Development Environment", basically some form of code editor such as:
  - [Visual Studio Code](https://code.visualstudio.com/)
    - Recommend you add some Extensions, you can do this within VSC
      - [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) adds overlaid explanations of errors and makes it easier to not miss them
      - [In your Face](https://marketplace.visualstudio.com/items?itemName=TTOOWA.in-your-face-incredible) is a fun extension that keeps you aware of errors in your current file
- A [GIT](https://github.com/) Account

## Working on the Project
The project is a [React](https://react.dev/) App which makes use of [Next.js](https://nextjs.org/learn) for routing and various other benefits.
The components used leverage [Material UI](https://mui.com/material-ui/getting-started/).

The project is written in [TypeScript](https://www.typescriptlang.org/docs/handbook/2/basic-types.html#explicit-types) to reduce errors and improve workflow.

If you wish to work on the project, you can clone it down and get started on your own branch, note deploying changes is dependent on pushes/merges to the `main` branch which is protected and requires a Pull Request approval from the repo owner; basically if Yinoguns approves the change, e.g. it is **stable**, **worthwhile**, and **well enough written** then it can be merged.

Make sure you are familiar:
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/handbook/2/basic-types.html#explicit-types)
- [Next.js](https://nextjs.org/learn)
  - Server Side Rendering is enabled on this project.
- Git
  - Flow
  - Cloning
  - Pulling
  - Branching
  - Commiting
  - Pushing
  - Pull Requests

Yinoguns' personally makes use of [Sourcetree](https://www.sourcetreeapp.com/) a free to use and intuative GUI for GIT management.

### Onto Developing

First, clone the repo.

Second, install node modules: `npm i` if you have not worked with node before, see **Working with NPM/etc**

To run the application use `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Now all you need to do is make code changes, new files, etc and it will hot-reload the changes, if something odd happens, stopping (CTRL+C in the terminal) and re-running the app can sometimes sort it out.

Note the deployments will fail if there are any errors, even light ones like "unused variables", if you're using VCS make sure to check the `Problems` tab and make sure it is empty.

Any questions, ask Yinoguns



---

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

