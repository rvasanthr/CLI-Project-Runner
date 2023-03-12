#!/usr/bin/env node
// Require lodash to solve problem caused by on('add') problem
const debounce = require('lodash.debounce');
// Require in chokidar
const chokidar = require('chokidar');
// Adding Caporal
const program = require('caporal');
// Adding File System
const fs = require('fs');
// Adding child_process to use spawn
const { spawn } = require('child_process');
// Adding chalk for colouring output
const chalk = require('chalk');
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
        // process is a global variable in node so using a different name
        let ourProcess;
        // Custom function for handling on('add')
        const start = debounce(() => {
            // If our exists, kill it
            if (ourProcess) {
                console.log(chalk.inverse('Killing process.'));

                ourProcess.kill();
            }
            // Executes the js code provided
            console.log(chalk.inverse('Starting process...'));
            ourProcess = spawn('node', [name], { stdio: 'inherit' });
            // console.log("Starting User's Program");
        }, 250);
        // One-liner for current directory
        chokidar.watch('.')
            .on('add', start)
            .on('change', start)
            .on('unlink', start);
    });
program.parse(process.argv);