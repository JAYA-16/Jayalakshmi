const {workerData,parentPort} = require('worker_threads');
console.log("This is the data in the worker---->", workerData.value)

parentPort.postMessage("AWESOME!!!! GO AHEAD....");