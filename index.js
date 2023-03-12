#!/usr/bin/env node
// Require lodash to solve problem caused by on('add') problem
const debounce = require('lodash.debounce');
// Require in chokidar
const chokidar = require('chokidar');
// Adding Caporal
const program = require('caporal');
// Caporal code specific to our project
program.version('0.1.0')
    .argument('[file-name]', 'Name of the file to execute')
    .action((args) => {
        // Custom function for handling on('add')
        const start = debounce(() => {
            console.log("Starting User's Program");
        }, 200);
        // One-liner for current directory
        chokidar.watch('.')
            .on('add', start)
            .on('change', start)
            .on('unlink', start);
    });
program.parse(process.argv);