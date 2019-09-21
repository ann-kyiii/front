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
