# React Native - ITGlobers Builder Blox Framework

## Overview

This monorepo uses [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) and [TypeScript](https://www.typescriptlang.org/) to support a modular React Native project.  

The core idea is to isolate the JavaScript app code from the platform configurations (native code + the app bundlers like Metro and Webpack).  
This isolation happens by using different [workspaces](https://classic.yarnpkg.com/en/docs/workspaces/): We have an `app` workspace for the JavaScript app code, a `mobile` workspace for the React Native mobile configuration, a `macos` workspace for the React Native macOS configuration, and so on.  

We fully embrace [Yarn `nohoist`](https://classic.yarnpkg.com/blog/2018/02/15/nohoist/) to allow using different versions of React Native on each platform (which is recommended but not required), simplifying the adoption of new React Native updates.  
Thanks nohoist, each platform workspace (`mobile`, `macos`, etc.) can depend on any React Native version, regardless of what version the other platform workspaces are using. 
For example, we can use `react-native@0.65` on the mobile app and `react-native@0.63` on the macOS app — as long as the JavaScript app code supports both versions.  
This approach promotes gradual React Native updates over updates in lockstep.  

For more details, check out ["Running React Native everywhere: Yarn Workspaces monorepo setup"](https://mmazzarolo.com/blog/2021-09-12-running-react-native-everywhere-monorepo/).  

> ⚠️ Please notice that I'm not saying this is the _right_ way to do React Native monorepos. This is just an approach that I enjoy using on larger codebases :)

## Supported platforms

- Android (React Native 0.70.1)
- iOS (React Native 0.70.1)

## Getting started

You can use this repo as a boilerplate, removing the workspaces of platforms that you don't need, or you can create this setup from scratch if you want to fully understand how it works. 

### Using this repository as a boilerplate

1. Clone the repository: `git@github.com:rafygonzalez/rn-framework.git`
2. Run yarn install `cd rn-framework && yarn` 

## Available commands

Development and build commands:

- `yarn android:metro`: Start the metro server for Android/iOS
- `yarn android:start`: Start developing the Android app
- `yarn android:studio`: Open the android app on Android Studio
- `yarn ios:metro`: Start the metro server for Android/iOS
- `yarn ios:start`: Start developing the iOS app
- `yarn ios:pods`: Install iOS cocoapods dependencies
- `yarn ios:xcode`: Open the iOS app on XCode


Other commands (we use [ultra-runner](https://github.com/folke/ultra-runner) to run these commands on all workspaces): 

- `yarn lint`: Lint each project
- `yarn lint:fix`: Lint + fix each project
- `yarn test`: Run tests of each project
- `yarn typecheck`: Run the TypeScript type-checking on each project


## Native dependencies

While working on React Native in a monorepo, you'll notice that several packages won't work correctly when hoisted — either because they need to be natively linked or because they end up being bundled twice, breaking the build (e.g., `react`, `react-dom`).  
This is not an issue with the approach used in this project per se. It's more of a common problem with monorepos.  

To fix these issues, [we mark them as nohoist](https://classic.yarnpkg.com/blog/2018/02/15/nohoist/), so they will be installed in each package that depends on them.  

In this monorepo, you can see an example of such libraries in `react-native-async-storage`.  

In the metro bundler and Webpack configs used across the monorepo, [we're using a set of build-tools](https://github.com/mmazzarolo/react-native-monorepo-tools/) to ensure nohoisted packages are resolved correctly.  
So, as long as you add these libraries [to the `nohoist` list](https://github.com/mmazzarolo/react-native-universal-monorepo/blob/a7dcfcbe7c7df66f6d11f06dd13f51ff94b1e70c/package.json#L9-L19), you should be good to go 👍  

## Yarn Classic vs Yarn 2+

We're striving to make this setup compatible with Yarn Classic — but, [with a few tweaks](https://yarnpkg.com/getting-started/migration), it's compatible with Yarn 2+ as well (providing all Yarn 2+ benefits).  
See [#22](https://github.com/mmazzarolo/react-native-universal-monorepo/issues/22) for more info. 

## Setting up Yarn 2+

1. Run `yarn set version berry` at the root of project. It will create a `.yarnrc.yml` file. 
2. Add the following lines to `.yarnrc.yml` to ensure `node_modules` directories are all created in each workspace:
```yml
nodeLinker: node-modules
nmHoistingLimits: workspaces
```
3. `nmHositingLimits` tells how to hoist dependencies for each workspace. By setting it to `workspaces` all dependencies will be installed in each workspace's `node_modules` rather than being hoisted to the root folder. This means you can now you can safely the `noHoist` section in the root's `package.json`. 

Check out [Yarn 2+'s "getting started" guide](https://yarnpkg.com/getting-started/install) for more info.  


## Known issues

In some cases, Yarn Classic won't be able to resolve correctly dependencies that have a `peerDependency` on `react-native`.  
See [#22](https://github.com/mmazzarolo/react-native-universal-monorepo/issues/22) for a few workarounds. A fix on the `react-native-monorepo-tools` repo [is on the work](https://github.com/mmazzarolo/react-native-monorepo-tools/issues/9). 

## Contributing

Contributions, discussions, and feedback are welcome! Please ask if there are any active plans on feature changes before submitting new PRs 👍
