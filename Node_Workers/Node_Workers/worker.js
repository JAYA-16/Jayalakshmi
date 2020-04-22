const {
    workerData,
    parentPort
} = require('worker_threads');
// console.log("This is the data in the worker---->", workerData.value.length);
modify();
function modify() {

    for (var i = 0; i < 2; i++) {
        let {
            id,
            data
        } = workerData.value[i];
        console.log("worker thread--->", id + data);
        parentPort.postMessage(id + data);
    }
    parentPort.postMessage('ok');
}
process.exit();
