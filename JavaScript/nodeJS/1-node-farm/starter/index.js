const fs = require("fs"); // requiring file system module

const textIn = fs.readFileSync("./txt/input.txt", "utf-8"); // how to read
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut); // how to write

console.log("File written!");
