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
