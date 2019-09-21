[![node-version](https://img.shields.io/badge/node-12.7.0-green.svg)](https://github.com/nodejs/node)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

**N-Lab Lib Booking system for Frontend**

# Quick Start

```console
# change dir in front

# Install node_modules based on `yarn.lock`
$ yarn

# Start
$ yarn start

# Access from Smart Phone by serveo
$ ssh -R 80:localhost:3000 serveo.net
# like this 👉 Forwarding HTTP traffic from https://***.serveo.net
```

# Setup

## Install node and yarn

Refer from [here](https://github.com/Dai7Igarashi/frontend-hands-on#setup-nodejs)  

You must install **node-12.7.0** !!  

If you're working on **Windows**, please see next links.  
- [nodist](https://github.com/nullivex/nodist/releases)(node version manager)
  - [usage](https://github.com/nullivex/nodist#commands)
- [yarn](https://yarnpkg.com/lang/ja/docs/install/#windows-stable)

## Create React App by Typescript

This is the way to init this app totally by yourself.  
Need not to do below and you can get by `git clone` in first time or `git pull` on working, then you need reinstall node_modules by `yarn` command every time.

Refer from [here](https://create-react-app.dev/docs/adding-typescript)

```console
$ yarn create react-app books-front --typescript
```

## Setup eslint

### install

```console
$ yarn add -D eslint-config-airbnb

# init eslint
$ yarn eslint --init

? How would you like to use ESLint? 
  To check syntax only 
  To check syntax and find problems 
❯ To check syntax, find problems, and enforce code style 

? What type of modules does your project use? (Use arrow keys)
❯ JavaScript modules (import/export) 
  CommonJS (require/exports) 
  None of these 

? Which framework does your project use? (Use arrow keys)
❯ React 
  Vue.js 
  None of these 

? Does your project use TypeScript? (y/N) y  

? Where does your code run? (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◉ Browser
 ◯ Node  

? How would you like to define a style for your project? (Use arrow keys)
❯ Use a popular style guide 
  Answer questions about your style 
  Inspect your JavaScript file(s) 

? Which style guide do you want to follow? (Use arrow keys)
❯ Airbnb (https://github.com/airbnb/javascript) 
  Standard (https://github.com/standard/standard) 
  Google (https://github.com/google/eslint-config-google) 

? What format do you want your config file to be in? (Use arrow keys)
❯ JavaScript 
  YAML 
  JSON 

? Would you like to install them now with npm? (Y/n) n  
```

Now `.eslintrc.js` is created and you can delete these command in `package.json`.
```
# package.json
  "eslintConfig": {
    "extends": "react-app"
  },
```

### write scripts

```console
# install npm-run-all for run-s command
# When adding stylelint, you can expand easily by this command.
$ yarn add -D npm-run-all
```

Write these scripts in `package.json`.  

```json
"scripts": {
  ...
  "lint": "run-s lint:*",
  "lint:js": "eslint 'src/**/*.{js,jsx,ts,tsx}' --quiet",
  "fix": "run-s fix:*",
  "fix:js": "eslint 'src/**/*.{js,jsx,ts,tsx}' --quiet --fix"
}
```

# Notification

## CircleCI

CircleCL watches lint error by `yarn lint` command. Before pushing on GitHub, you should do `yarn fix`.