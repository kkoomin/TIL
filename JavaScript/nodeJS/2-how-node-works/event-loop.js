const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 2; // number of thread pools we have

setTimeout(() => console.log("Timer 1 finished"), 0); // 2nd or 3rd
setImmediate(() => console.log("Immediate 1 finished")); // 3rd or 2nd

fs.readFile("test-file.txt", () => {
  console.log("I/O finished!");
  console.log("------------------");

  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"));

  process.nextTick(() => console.log("Process.nextTick"));

  // These crypto codes takes different amount of time depending on the number of thread pools.
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted!");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted!");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted!");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted!");
  });
}); // 4th (cuz the file is big)

console.log("Hello from the top-level code!"); // 1st
