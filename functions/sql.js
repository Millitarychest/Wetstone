const creds = require('../config/creds.json');
const mariaDB = require('mariadb');
const pool = mariaDB.createPool({
    host: creds.sql.host,
    user: creds.sql.user,
    password: creds.sql.pw,
    database: creds.sql.db,
    connectionLimit: 5
});


async function fetchProjects(){
        var sql = "SELECT * FROM projects join Env on projects.EnvID = Env.ID";
        try{
            conn = await pool.getConnection()
            const rows = await conn.query(sql);
            conn.end();
            return rows;
        }catch(err){
            console.log(err);
        }
}
async function fetchCompProjects(){
    var sql = "SELECT * FROM projects join Env on projects.EnvID = Env.ID where projects.status = 'done' or projects.status = 'wip'";
    try{
        conn = await pool.getConnection()
        const rows = await conn.query(sql);
        conn.end();
        return rows;
    }catch(err){
        console.log(err);
    }
}
async function fetchIdeas(){
    var sql = "SELECT * FROM projects join Env on projects.EnvID = Env.ID where projects.status = 'planned'";
    try{
        conn = await pool.getConnection()
        const rows = await conn.query(sql);
        conn.end();
        return rows;
    }catch(err){
        console.log(err);
    }
}
async function fetchNotes(){
    var sql = "SELECT * FROM Notes";
    try{
        conn = await pool.getConnection()
        const rows = await conn.query(sql);
        conn.end();
        return rows;
    }catch(err){
        console.log(err);
    }
}
async function fetchPreview(){
    var sql = "SELECT * FROM projects join Env on projects.EnvID = Env.ID where projects.status = 'done' or projects.status = 'wip' or projects.status = 'planned' limit 4";
    try{
        conn = await pool.getConnection()
        const rows = await conn.query(sql);
        conn.end();
        return rows;
    }catch(err){
        console.log(err);
    }
}

module.exports = {fetchProjects, fetchCompProjects, fetchIdeas, fetchNotes, fetchPreview}
