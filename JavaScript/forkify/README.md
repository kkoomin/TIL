# Forkify (test)

> The Complete JavaScript Course 2020  
> Created by. Jonas Schmedtmann
>
> **This repo is to study with JS online lecture.**

## About

Modern JavaScript: Using ES6, NPM, Babel and Webpack

## Structure

**dist** = distribution folder (final files which is ready to be deployed and served to the client, ex. CSS, img, final JS files)

**src** = source folder (source files, such as .js, .html) -> only for dev purpose

**.gitignore** -> '<filename>/' (slash needed)

## 2019.12 setting command

1. webpack
   - To bundle the ES6 modules together  
     `npm install --save-dev webpack@4 webpack-cli@2 webpack-dev-server@3`
2. babel
   - Babel is a JavaScript compiler. (ES6 -> ES5)
   - To convert cutting edge JS (ES6,7,8.. = ESNext), back to ES5
   - To make all browsers are capable of understand our code  
     `npm install --save-dev babel-core@6 babel-preset-env@1 babel-loader@7`  
     `npm install --save babel-polyfill@6`

## MVC Architecture (Model-View-Controller)

- Model : concerned about the data and the apps logic
- View : gets and displays data from and to the UI(User Interface)
- Controller : brings Model and View together

* Model and View never actually have to communicate

```
  MODEL              CONTROLLER           VIEW
----------------------------------------------------
Search.js                              searchView.js
Recipe.js            CONTROLLER        recipeView.js
List.js               index.js         listView.js
Likes.js                               likesView.js
```

## How ES6 modules works

```
export default <>
export <>

import <any name> from <path>
import {<specific names (if there are multiple things exported)>} from <path>
import {<specific name> as <name>} from <path>
import * as <name> from <path>                (* : import everything)

```

- If it's external npm package, we don't need write the path, just package name.

## API

- API key : Like a password or unique ID that each user can use in order to make requests so that the API can track how many request the user make per day
- http://forkify-api.herokuapp.com/
