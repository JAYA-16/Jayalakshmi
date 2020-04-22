const cron = require("node-cron");
const express = require("express");
const app = express();
const {
    Worker,
    isMainThread,
    parentPort
} = require('worker_threads');
const {
    Client
} = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'sample',
    password: 'abc123',
    port: 5432,
});

client.connect();
let t = 0;
cron.schedule("*/10 * * * * *", function () {
    console.log("Running for every 10 seconds!");
    const query = `SELECT * FROM tests limit 2 offset $1`;
    client.query(query, [t], (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        // console.log("Response from the database....", res.rows);

        const worker = new Worker('./worker.js', {
            workerData: {
                value: res.rows,
                path: './worker.js'
            }
        });

        worker.on('message', (msg) => {

            if (msg === 'ok')
            {
                console.log("TERMINATED");
                worker.terminate();
                }
            else {
                console.log("------>",msg);
                }
        });
        worker.on('error', () => {
            console.log("Error Occured!");
        });
        worker.on('exit', (code) => {
            if (code !== 0) {
                console.log("Worker stopped with the exit code of", code);
            }
        })
        // process.kill();
    });

    // process.exit();
    t = t + 2;
});
console.log("HELLO WORLD!");

app.listen(3000);