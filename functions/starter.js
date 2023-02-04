const { exec } = require('node:child_process');

async function execProject(path, command) {
    exec('cd ' + path + ' && ' + command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        return;
    })
}

module.exports = {execProject}