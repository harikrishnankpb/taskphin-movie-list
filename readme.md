# Task-1

**Version:** 1.0.0  
**Description:** Movie-list
**Author:** Harikrishnan KP  
**License:** ISC

## Overview

This project, named "movie-list," is part of the Askphin assignment. It is a TypeScript-based web application designed for managing and listing movies.
This project utilizes various JavaScript and TypeScript technologies to create a Rest Api server with Express, Postgresql with Prisma, and other essential dependencies.

## Prerequisites

Before you begin, ensure that you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/): Task-1 relies on Node.js for server-side JavaScript and TypeScript execution.
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/): npm is the package manager for JavaScript and comes bundled with Node.js. Alternatively, you can use Yarn.

## Usage

### Development

To run the project in development mode, use the following command::

```sh
npm run dev
```

This command will start the development server using nodemon, which automatically restarts the server when you make changes to the source code.

### Build

To build the project, use the following command:

```sh
npm run build
```

This command will compile the TypeScript code to JavaScript and place the output in the "dist" directory.

### Start

To start the project in production mode, use the following command:

```sh
npm run listen
```

This command will run the application using the compiled JavaScript code from the "dist" directory.

## Scripts

Movie-list includes several npm scripts to simplify common development tasks:

- **test:** Run tests
- **listen:** Compile TypeScript code and start the application.
- **dev:** Run the development server with automatic code reload.
- **build:** Compile TypeScript code to JavaScript.

## Dependencies

Task-1 relies on various external libraries and dependencies, including:

## Dependencies

- **@prisma/client:** Version 5.4.2 - Prisma client for database access.
- **bcrypt:** Version 5.1.0 - A library for hashing passwords.
- **cookie-parser:** Version 1.4.6 - Middleware for parsing cookies.
- **cors:** Version 2.8.5 - Middleware for handling Cross-Origin Resource Sharing.
- **dayjs:** Version 1.11.10 - Library for working with dates and times.
- **dotenv:** Version 16.3.1 - Loads environment variables from a .env file.
- **express:** Version 4.18.2 - Fast and flexible Node.js web application framework.
- **jsonwebtoken:** Version 9.0.0 - JSON Web Token (JWT) library for Node.js.
- **node-persist:** Version 3.1.3 - Library for local data storage.
- **validator:** Version 13.11.0 - Library for data validation.
