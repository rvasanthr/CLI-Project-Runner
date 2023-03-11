#!/usr/bin/env node
// Require in chokidar
const chokidar = require('chokidar');
// One-liner for current directory
chokidar.watch('.')
    .on('add', () => console.log('File Added'))
    .on('change', () => console.log('File Changed'))
    .on('unlink', () => console.log('File Unlinked'));