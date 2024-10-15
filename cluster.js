// imports
const cluster = require('cluster');
const os = require("os"); 

// retrieves the amount of available cores
const cpuCount = os.availableParallelism();

// basic cluster setup
console.log(`The total number of CPUs is ${cpuCount}`);
console.log(`Primary pid=${process.pid}`);
cluster.setupPrimary({
  exec: __dirname + "/bin/www",
});

// this loop is responsible
// to add different node instances
for (let i = 0; i < cpuCount; i++) {
  cluster.fork();
}

// this event spawns another node instance in case one of the
// instances crash which could potentially avoid the entire server from crashing
cluster.on("exit", (worker, code, signal) => {
  console.log(`worker ${worker.process.pid} has been killed`);
  console.log("Starting another worker");
  cluster.fork();
});