// Firstly we'll need to import the fs library
const fs = require("fs");
const path = require("path");

// next we'll want make our Logger object available
// to whatever file references it.
const Logger = {}

// Create 3 sets of write streams for the 3 levels of logging we wish to do
// every time we get an error we'll append to our error streams, any debug message
// to our debug stream etc...

const infoFile = path.resolve(process.cwd(), "./server/logs/info.txt");
const errorFile = path.resolve(process.cwd(), "./server/logs/error.txt");
const debugFile = path.resolve(process.cwd(), "./server/logs/debugs.txt");

const infoStream = fs.createWriteStream(infoFile);
// Notice we set the path of our log files in the first parameter of 
// fs.createWriteStream. This could easily be pulled in from a config
// file if needed.
const errorStream = fs.createWriteStream(errorFile);
// createWriteStream takes in options as a second, optional parameter
// if you wanted to set the file encoding of your output file you could
// do so by setting it like so: ('logs/debug.txt' , { encoding : 'utf-8' });
const debugStream = fs.createWriteStream(debugFile);

const log = (fileName) => (payload, msg = "") => {
    var message = `[${new Date().toISOString()}]:[${msg}]:[${JSON.stringify(payload)}] \n`;
    fs.appendFile(fileName, message, (err) => { if (err) throw err; });
}
// Finally we create 3 different functions
// each of which appends our given messages to 
// their own log files along with the current date as an
// iso string and a \n newline character

Logger.info = log(infoFile);
Logger.debug = log(debugFile);
Logger.error = log(errorFile);


module.exports = Logger