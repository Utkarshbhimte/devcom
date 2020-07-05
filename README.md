# Makerdock
A platform for developer so share and discuss their projects

## How to start contributing?
Checkout this issue to get started (https://github.com/makerdock/devcom/issues/15)

## 👉 Get Started

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Install dependencies

```
npm install
```

Update your `.env` file with values for each environment variable

```
API_KEY=AIzaSyBkkFF0XhNZeWuDmOfEhsgdfX1VBG7WTas
etc ...
```

Run the development server

```
npm run dev
```

When the above command completes you'll be able to view your website at `http://localhost:3000`

## 🥞 Stack

This project uses the following libraries and services:

- Framework - [Next.js](https://nextjs.org)
- UI Kit - [Bulma](https://bulma.io)
- Authentication - [Firebase Auth](https://firebase.google.com/products/auth)
- Newsletter - [Mailchimp](https://mailchimp.com)
- Analytics - [Google Analytics](https://googleanalytics.com)
- Hosting - [Vercel](https://vercel.com)

## Setting up the Project

- Fork the repo and clone it to your local machine.
- For the project to work you have to setup a firebase project.
  Create a Project from the [firebase console](https://console.firebase.google.com/).

- Enable firestore in your project and firebase auth (google and sign-in password) in your firebase console.
- Once that is done, duplicate the .env.example file and rename it to just .env. Grab the keys from firebase console and paste it in the .env file.
- Run `npm install` to install the dependencies and `npm run dev` to start the project. More details are available in the guide section.
- To check your local deployment, login to [vercel](https://vercel.app) and link your github repo that you forked to it.
- Whitelist vercel domains on your firebase auth Authorized Domains as well.

## 📚 Guide

  <details>
    <summary><b>Styles</b></summary>
    <p>
      You can edit Bulma SASS variables in the global stylesheet located at <code><a href="src/styles/global.scss">src/styles/global.scss</a></code>. Variables allow you to control global styles (like colors and fonts), as well as element specific styles (like button padding). Before overriding Bulma elements with custom style check the <a href="https://bulma.io/documentation">Bulma docs</a> to see if you can do what need by tweaking a SASS variable.
    </p>
    <p>
      Custom styles are located in their related component's directory. For example, if any custom style is applied to the Navbar component you'll find it in <code>src/components/Navbar.scss</code>. We ensure custom styles are scoped to their component by prepending the classname with the component name (such as <code>.Navbar__brand</code>). This ensures styles never affect elements in other components. If styles need to be re-used in multiple components consider creating a new component that encapsulates that style and structure and using that component in multiple places.
    </p>
  </details>

  <details>
    <summary><b>Routing</b></summary>
    <p>
      This project uses the built-in Next.js router and its convenient <code>useRouter</code> hook. Learn more in the <a target="_blank" href="https://github.com/zeit/next.js/#routing">Next.js docs</a>.

```jsx
import Link from "next/link";
import { useRouter } from "next/router";

function MyComponent() {
  // Get the router object
  const router = useRouter();

  // Get value from query string (?postId=123) or route param (/:postId)
  console.log(router.query.postId);

  // Get current pathname
  console.log(router.pathname);

  // Navigate with the <Link> component or with router.push()
  return (
    <div>
      <Link href="/about">
        <a>About</a>
      </Link>
      <button onClick={(e) => router.push("/about")}>About</button>
    </div>
  );
}
```

</p>

  </details>

  <details>
<summary><b>Authentication</b></summary>
<p>
  This project uses <a href="https://firebase.google.com">Firebase Auth</a> and includes a convenient <code>useAuth</code> hook (located in <code><a href="src/util/auth.js">src/util/auth.js</a></code>) that wraps Firebase and gives you common authentication methods. Depending on your needs you may want to edit this file and expose more Firebase functionality.

```jsx
import { useAuth } from "./../util/auth.js";

function MyComponent() {
  // Get the auth object in any component
  const auth = useAuth();

  // Depending on auth state show signin or signout button
  // auth.user will either be an object, null when loading, or false if signed out
  return (
    <div>
      {auth.user ? (
        <button onClick={(e) => auth.signout()}>Signout</button>
      ) : (
        <button onClick={(e) => auth.signin("hello@divjoy.com", "yolo")}>
          Signin
        </button>
      )}
    </div>
  );
}
```

</p>
</details>

  <details>
<summary><b>Database</b></summary>

<p>
  This project uses <a href="https://firebase.google.com/products/firestore">Cloud Firestore</a> and includes some data fetching hooks to get you started (located in <code><a href="src/util/db.js">src/util/db.js</a></code>). You'll want to edit that file and add any additional query hooks you need for your project.

```jsx
import { useAuth } from './../util/auth.js';
import { useItemsByOwner } from './../util/db.js';
import ItemsList from './ItemsList.js';

function ItemsPage(){
  const auth = useAuth();

  // Fetch items by owner
  // It's okay if uid is undefined while auth is still loading
  // The hook will return a "loading" status until it has a uid
  const uid = auth.user ? auth.user.uid : undefined;
  const { data: items, status } = useItemsByOwner(uid);

  // Once we items data then render ItemsList component
  return (
    <div>
      {status === "loading" ? (
        <span>One moment please</span>
      ) : (
        <ItemsList data={items}>
      )}
    </div>
  );
}
```

</p>
</details>

  <details>
    <summary><b>Deployment</b></summary>
    <p>
    Install the Vercel CLI

```
npm install -g vercel
```

Add each variable from `.env` to your Vercel project with the following command. You'll be prompted to enter its value and then choose one or more environments (development, preview, or production).
<a target="_blank" href="https://vercel.com/docs/v2/build-step#environment-variables">Learn more here</a>.

```
vercel env add VARIABLE_NAME
```

Run this command to deploy a preview (for testing a live deployment)

```
vercel
```

Run this command to deploy to production

```
vercel --prod
```

See the <a target="_blank" href="https://vercel.com/docs/v2/platform/deployments">Vercel docs</a> for more details.

</p>

  </details>

  <details>
    <summary><b>Other</b></summary>
    <p>
      The <a href="https://github.com/zeit/next.js">Next.js documentation</a> covers many other topics.
      This project was initially created using <a href="https://divjoy.com?ref=readme_other">Divjoy</a>, a React codebase generator. Feel free to ask questions in the <a href="https://spectrum.chat/divjoy">Divjoy forum</a> and we'll do our best to help you out.
    </p>
  </details>
  
## Wireframes
https://whimsical.com/XpTV7oZ7vXzXPuLj6q8mFc

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://sreetamdas.com"><img src="https://avatars3.githubusercontent.com/u/11270438?v=4" width="100px;" alt=""/><br /><sub><b>Sreetam Das</b></sub></a><br /><a href="#content-sreetamdas" title="Content">🖋</a> <a href="https://github.com/makerdock/devcom/commits?author=sreetamdas" title="Code">💻</a> <a href="#ideas-sreetamdas" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/Utkarshbhimte"><img src="https://avatars1.githubusercontent.com/u/13379773?v=4" width="100px;" alt=""/><br /><sub><b>Utkarsh Bhimte</b></sub></a><br /><a href="https://github.com/makerdock/devcom/commits?author=Utkarshbhimte" title="Code">💻</a> <a href="#ideas-Utkarshbhimte" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://tapanawasthi.dev"><img src="https://avatars1.githubusercontent.com/u/40211415?v=4" width="100px;" alt=""/><br /><sub><b>tap0212</b></sub></a><br /><a href="https://github.com/makerdock/devcom/commits?author=tap0212" title="Code">💻</a></td>
    <td align="center"><a href="https://viralsangani.me/"><img src="https://avatars2.githubusercontent.com/u/36530381?v=4" width="100px;" alt=""/><br /><sub><b>Viral Sangani</b></sub></a><br /><a href="https://github.com/makerdock/devcom/commits?author=viral-sangani" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/jaynilgaglani/"><img src="https://avatars2.githubusercontent.com/u/48921037?v=4" width="100px;" alt=""/><br /><sub><b>Jaynil Gaglani</b></sub></a><br /><a href="https://github.com/makerdock/devcom/commits?author=Jaynil1611" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Harshi7016"><img src="https://avatars0.githubusercontent.com/u/44545218?v=4" width="100px;" alt=""/><br /><sub><b>Harshith Venkatesh</b></sub></a><br /><a href="https://github.com/makerdock/devcom/commits?author=Harshi7016" title="Code">💻</a> <a href="#ideas-Harshi7016" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/vineeth-cnbr"><img src="https://avatars0.githubusercontent.com/u/24208203?v=4" width="100px;" alt=""/><br /><sub><b>Vineeth Chandran</b></sub></a><br /><a href="#projectManagement-vineeth-cnbr" title="Project Management">📆</a> <a href="https://github.com/makerdock/devcom/commits?author=vineeth-cnbr" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
