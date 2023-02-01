const creds = require('../config/creds.json');

function fetchProjects(){
    var sql = "SELECT * FROM projects join Env on projects.env_id = Env.id";
}
function fetchCompProjects(){
    var sql = "SELECT * FROM projects join Env on projects.env_id = Env.id where project.status = 'done' or project.status = 'wip'";
}
function fetchIdeas(){
    var sql = "SELECT * FROM projects join Env on projects.env_id = Env.id where project.status = 'planned'";
}
function fetchNotes(){
    var sql = "SELECT * FROM Notes";
}
function fetchPreview(){
    var sql = "SELECT * FROM projects join Env on projects.env_id = Env.id where project.status = 'done' or project.status = 'wip' or project.status = 'planned' limit 4";
}

module.exports = {fetchProjects, fetchCompProjects, fetchIdeas, fetchNotes, fetchPreview}
