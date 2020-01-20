// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports //
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(2, 5));

// exports //
// const calc2 = require("./test-module-2");
// console.log(calc2.add(5, 6));
const { add, multiply, divide } = require("./test-module-2");
console.log(add(5, 7));

// caching //
require("./test-module-3")();
// Hello from the module
// Log this beautiful text!!
require("./test-module-3")();
// Log this beautiful text!!
require("./test-module-3")();
// Log this beautiful text!!

// the module only loaded once, so the code inside of it was also executed once only.
// second and third sentence comes from the cache
