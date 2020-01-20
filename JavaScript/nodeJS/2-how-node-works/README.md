# How Node.js Works

### Node, V8, Libuv and C++

Node.js relys on ...

- V8 engine:
  - converts JS code into machine code that a computer can understand.
  - Written in JS and C++
- Libuv:
  - open source library with a focus on asynchronous I/O.
  - This gives Node access to the underlying computer operating system, file system, networking, and more.
  - Written in C++
  - Implements `event loop` and `thread pool`
  - cf. event loop: It's responsible for handling easy tasks like executing callbacks and network I/O while the thread pool is for more heavy work(ex. file access, compression..)
- http-parser, c-ares, OpenSSL, zlib ...

### Node Process and Threads

- Node is running on the single thread
- Process is a program in execution on a computer.
- "top-level" code = which is not a callback fn

- `Single Thread` (Sequence of instructions)

  1. Initialize program
  2. Execute 'top-level' code
  3. Require modules
  4. Register event callbacks
  5. Start event loop

- `Thread Pool`

  - works when there is too heavy task to run on the single thread. (provided by libuv library)
  - Additional 4 threads (or more)
  - Offload work from the event loop
  - Handle heavy(=expensive) tasks:
    - File system APIs
    - Cryptography
    - Compression
    - DNS lookups

- `Event Loop`

  - All the application code that is inside callback functions.
  - Node.js is build around callback
  - Event-driven architecture:
    - Events are emitted
    - Event loops picks them up
    - Callbacks are called
  - Event loop does orchestration

- `I/O polling` : looking for new I/O events that are ready to be processed and putting them into the callback queue.

- `Don't Block!!` guide
  1. Don't use sync versions of functions in fs, crypto and zlib modules in your callback functions.
  2. Don't perform complex calculations (ex. loops inside loops)
  3. Be careful with JSON in large objects
  4. Don't use too complex regular expressions (ex. nested quantifiers)
