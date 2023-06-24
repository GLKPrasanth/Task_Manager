# CRUD APIs for Task Manager App - Node.js

This repository contains CRUD APIs for Task Manager App built with Node.js and Express. It provides endpoints to manage a list of tasks, with the ability to create, retrieve, update, and delete tasks.

## Endpoints

**GET** `/tasks`: Returns a JSON object with all tasks in the system.

**GET** `/tasks/:taskId`: Returns a JSON object with the details of the task corresponding to the provided `taskId`.

**POST** `/tasks`: Creates a new task in the system. The task details must be provided in the request body.

**PUT** `/tasks/:taskId`: Updates the details of a task corresponding to the provided `taskId`. The updated task details must be provided in the request body.

**DELETE** `/tasks/:taskId`: Deletes the task corresponding to the provided `taskId`.

## Notes

This API uses a local JSON file (`tasks.json`) as its data store. This means that:

- Any changes to tasks (creating, updating, or deleting) will be written directly to this file.
- If the server is restarted, it will reload the current state of tasks from this file.

## Dependencies

- [Express](https://expressjs.com/): A fast, unopinionated, minimalist web framework for Node.js.
- [Body-parser](https://www.npmjs.com/package/body-parser): Node.js body parsing middleware.
- [fs](https://nodejs.org/api/fs.html): Node.js file system module, used to interact with the file system on your computer.
- [path](https://nodejs.org/api/path.html): Node.js path module, used for working with file and directory paths.
