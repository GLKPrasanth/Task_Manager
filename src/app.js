const express = require('express');
const taskRoutes = require('./routes/tasks')

const app = express();

const PORT = 3000;

app.listen(PORT, (err) => {
    if(!err) {
        console.log(`App is started and listening on port ${PORT}`)
    } else {
        console.log("Encountered an error while starting a server")
    }
})

app.use('/tasks', taskRoutes)
