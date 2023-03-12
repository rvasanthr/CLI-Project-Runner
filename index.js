#!/usr/bin/env node
// Require lodash to solve problem caused by on('add') problem
const debounce = require('lodash.debounce');
// Require in chokidar
const chokidar = require('chokidar');
// Custom function for handling on('add')
const start = debounce(() => {
    console.log('Starting User\'s Program');
}, 180);
// One-liner for current directory
chokidar.watch('.')
    .on('add', start)
    .on('change', () => console.log('File Changed'))
    .on('unlink', () => console.log('File Unlinked'));