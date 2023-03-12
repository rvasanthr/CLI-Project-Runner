#!/usr/bin/env node
// Require lodash to solve problem caused by on('add') problem
const debounce = require('lodash.debounce');
// Require in chokidar
const chokidar = require('chokidar');
// Adding Caporal
const program = require('caporal');
// Adding File System
const fs = require('fs');
// Caporal code specific to our project
program.version('0.1.0')
    .argument('[file-name]', 'Name of the file to execute')
    .action(async ({ fileName }) => {
        // If there is no fileName given by user, use index.js
        const name = fileName || 'index.js';
        // Access from FS as a promise (checks existence of file)
        // Will throw error when file absent, handle with try{}catch(err)
        try {
            await fs.promises.access(name);
        } catch (error) {
            throw new Error(`Could not find the file "${name}"`);
        }
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