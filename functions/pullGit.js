const simpleGit = require('simple-git');

async function cloneGit(path, url) {
    const git = simpleGit(path);
    return await git.clone(url, path, []);
}

module.exports = {cloneGit};