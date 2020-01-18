# NodeJS Course

> Complete Node Bootcamp
> Created by. Jonas Schmedtmann

## Material List

1. 1-node-farm
2. 2-how-node-works
3. 3.asynchronous-JS
4. 4-natours (Project)

-> What I gonna do : Study with starter folder in each folder, and get the same result with final folder.

-> With node v12.14.1 / npm 6.13.4

## NPM Package List

- node-farm
  1. slugify : to create slugs (slug: last part of a url that contains a unique string that identifies the resource that the website is displaying)
  2. nodemon(dev) : nodejs app automatically restarting whenever we change files in our working dir  
     `nodemon index.js` instead of simply `node index.js`

## Lecture Notes

- terminal clear short cut : Command + K
- node REPL (Read-Eval-Print Loop)
- In node REPL,
  1. \_ means previous results.
  2. Hit the tap to load the methods.

```nodeJS
1)
> 3*8
24
> _+6
30

2)
>String. <tap><tap>
String.__defineGetter__      String.__defineSetter__
String.__lookupGetter__      String.__lookupSetter__
String.__proto__             String.hasOwnProperty
String.isPrototypeOf         String.propertyIsEnumerable
String.toLocaleString        String.valueOf
                (...)
```

- API is a service from which we can request some data.
- `fs.readFile(`\${**dirname}/dev-data/data.json`);`  
  "." is where the script running, "**dirname" is where the current file is located.
- If in the arrow function, there's no curly braces, it will return automatically even though there's no 'return' written.
- Every single file in Node js is treated as a module.
  1. Create 'module' folder
  2. Make the file named with function name.
  3. `module.exports = () => {}` Make the fn (in this case, export an anonymous fn)
  4. `const <variable name> = require(<module path>)`
- NPM : Node Package Manager. Command line interface app. We use it to install and manage the open source packages.
- package.json
  1. simple(regular) dependencies : packages that contain some code that we'll include in our own code.
  2. development dependencies : packages we use to develop our application. (not needed for production)
- Package versioning and updating
  - `"^<major version>.<minor version>.<patch version>"`
    ex) `"nodemon": "^1.18.11"`
    1. Patch Version: only intended to fix bugs
    2. Minor Version: introduces some new features into the package (exclude breaking changes. Will not break our code)
    3. Major Version: with huge new release which can have breaking changes
    4. `^`: only accept minor and patch releases  
       `~`: only accept patch releases
  - `npm outdated`: to get the list of outdated packages
  - `npm update <package name>`: to update certain package
  - NEVER need to share `node_modules` folder
