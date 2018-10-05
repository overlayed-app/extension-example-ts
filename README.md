# overlayed-extension-example

[![Build Status](https://travis-ci.org/overlayed-app/extension-example-ts.svg?branch=master)](https://travis-ci.org/overlayed-app/extension-example-ts)
[![Coverage Status](https://coveralls.io/repos/github/overlayed-app/extension-example-ts/badge.svg?branch=master)](https://coveralls.io/github/overlayed-app/extension-example-ts?branch=master)

An example [overlayed](https://github.com/bengreenier/overlayed) extension

## Walkthrough

> These steps describe the process that went into creating this extension, and documents why things are the way they are!

<details>
<summary> Package.json </summary>

For overlayed, `package.json` must contain some critical information so we add that

+ First, a `main` entry that points at the entry point - we'll define that later, as `dist/index.js` so we can fill that in now
+ We'll need a `version` entry - probably `1.0.0` to start
+ We need a unique `name` entry as well (here we use `overlayed-extension-example`)
+ We'll add some scripts to configure our build and test operations, but they won't work until after we complete the dependencies section below.
+ `clean` should simply call `rimraf dist` to clean up our `dist` folder that things will be built into
+ `build` should call `npm run clean && tsc` to run that clean script, and then run the typescript compiler to produce a build into `dist`
+ `test` should call `jest` to run jest, our test tool
+ We also add information about our plugin configuration, but we'll talk about that a bit later

</details>

<details>
<summary> Dependencies </summary>

+ We first configure our typescript environment using `tsconfig.json` - this describes how our transpilation step will work, and what features are supported.
+ We configure a typescript linter using `tslint.json` - this describes our code style guide, and the expected ways to author new code.
+ Once we have those configurations in place, we ensure we have the right build tools installed with `npm i -D tslint typescript jest ts-jest coveralls`
+ After we get those tools, we'll need some type definitions so typescript can be happy - we get those with `npm i -D @types/jest`
+ We'll also want some standard configurations for tslint - we get those with `npm i -D tslint-react tslint-config-prettier` 
+ We also use `rimraf` to cleanup our build directory when we build, so we get that with `npm i -D rimraf`
+ Finally, we know our code uses react, so we get it, and the types with `npm i react` and `npm i -D @types/react`
+ And to test react quickly, we use `npm i react-test-renderer` and `npm i -D @types/react-test-renderer`

To add additional dependencies, simply run `npm i <module>` which will add the dependency to the `package.json` file, and will be automatically installed by `overlayed` when the plugin is loaded.

</details>

<details>
<summary> Configuration </summary>

In overlayed, plugins convey what configuration they output much like a vscode extension, and consume these values at runtime via React props.

In our example, we define some configuration containing a `string` property, `username` that represents the username to show. This must be included in the project `package.json`:

```
"contributes": {
    "configuration": {
      "title": "Overlayed Extension Example Settings",
      "properties": {
        "username": {
          "description": "The username to show",
          "type": "string"
        }
      }
    }
  }
```

This allows overlayed to get an understanding for what configuration options this plugin brings, and help broadcasters populate that configuration more easily. 

After you've provided that configuration via `package.json` it's time to consume that via your plugin. To do so, we simply add React props with matching names:

```
interface IProps {
  username: string
}

class Example extends React.Component<IProps> {
  // ...
}
```

This allows the plugin author to recieve settings that are configured by the broadcaster.

</details>

<details>
<summary> Development </summary>

When authoring your plugin, the only requirement is that it is a React component that is __the default export from the main file__.

To ensure this in typescript, simply use `export default class YourPlugin extends React.Component`. This will generate the correct code when transpiling to `js`.

</details>

<details>
<summary> Deployment </summary>

In order for overlayed to run your plugin, you must currently make some less than ideal modifications to your project. We'll consider this part of the necessary deployment evil for now.

+ Run a build, creating `js` in the `dist` folder, with `npm run build`
+ Copy `package.json` __and any non-compiled dependencies__ to the `dist` folder
+ Copy the `dist` folder itself to the location where you wish to deploy your plugin (per `overlayed` docs this is likely `<home directory>/.overlayed`)
+ Rename the folder to `your plugin name` (so you have `home/.overlayed/Plugin`)

We'll work to make this process less tricky, but for now, this is a necessary step for a typescript plugin.

</details>

## Building

> This plugin uses typescript!

To build the plugin run `npm i & npm run build` - this will install any needed dependencies, and then run the build process. This will output `js` files into `dist`, which is why you'll notice that the `main` path in `package.json` points to `dist/index.js` instead of `src/index.ts`.

## Testing

To test our plugin, we use `jest` and `jest-ts`. This allows us to transpile our typescript test suite during the process of starting them, and it also gives us some great tools for testing `react` code. To run the tests, use `npm test`. You'll note that we also output test coverage, which can be a useful leading indicator of problems, but isn't a one-stop representation of how well your code is tested. In general, I aim for `70-80%` coverage.

## License

MIT