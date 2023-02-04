const simpleGit = require('simple-git');

async function cloneGit(path, url) {
    const git = simpleGit(path);
    return await git.clone(url, path, []);
}

async function pullGit(path) {
    const git = simpleGit(path);
    return await git.pull();
}

module.exports = {cloneGit, pullGit};