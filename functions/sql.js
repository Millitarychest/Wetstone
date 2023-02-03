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
async function updateProject(name, desc, envID, location, url, status, pnr){
    var sql = "UPDATE projects SET `PName` ='"+ name+"',`Desc` = '"+desc+"',`Location` = '"+location+"',`EnvID` = '"+envID+"',`Url` = '"+url+"',`status` = '"+status+"' WHERE `PNr` ="+pnr+";";
    try{
        conn = await pool.getConnection()
        const rows = await conn.query(sql);
        conn.end();
        return rows;
    }catch(err){
        console.log(err);
    }
}
async function fetchByName(name){
    var sql = "SELECT * FROM projects join Env on projects.EnvID = Env.ID where PName = '"+unescape(name)+"'";
    try{
        conn = await pool.getConnection()
        const rows = await conn.query(sql);
        conn.end();
        return rows;
    }catch(err){
        console.log(err);
    }
}
async function insertEnv(name, com){
    var sql = "INSERT INTO Env (`EName`, `Command`) VALUES ('"+name+"', '"+com+"');";
    try{
        conn = await pool.getConnection()
        const rows = await conn.query(sql);
        conn.end();
        return rows;
    }catch(err){
        console.log(err);
    }
}
async function fetchEnv(){
    var sql = "SELECT * FROM Env";
    try{
        conn = await pool.getConnection()
        const rows = await conn.query(sql);
        conn.end();
        return rows;
    }catch(err){
        console.log(err);
    }
}
async function insertProject(name, desc, env, location, url, status){
    var sql = "INSERT INTO projects (`PName`, `Desc`, `EnvID`, `Location`, `Url`, `status`) VALUES ('"+name+"', '"+desc+"', '"+parseInt(env)+"', '"+location+"', '"+url+"', '"+status+"');";
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
async function fetchNotes(){
    var sql = "SELECT * FROM notes";
    try{
        conn = await pool.getConnection()
        const rows = await conn.query(sql);
        conn.end();
        return rows;
    }catch(err){
        console.log(err);
    }
}

async function insertNote(title, content){
    var sql = "INSERT INTO notes (`Title`, `Content`) VALUES ('"+title+"', '"+content+"');";
    try{
        conn = await pool.getConnection()
        const rows = await conn.query(sql);
        conn.end();
        return rows;
    }catch(err){
        console.log(err);
    }
}
async function updateNote(title, content ,nnr){
    var sql = "UPDATE notes SET `Title` ='"+title+"',`Content` = '"+content+"' WHERE `NNr` ="+nnr+";";
    try{
        conn = await pool.getConnection()
        const rows = await conn.query(sql);
        conn.end();
        return rows;
    }catch(err){
        console.log(err);
    }
}
async function deleteProject(nr){
    var sql = "DELETE FROM projects where PNr = "+nr+";";
        try{
            conn = await pool.getConnection()
            const rows = await conn.query(sql);
            conn.end();
            return rows;
        }catch(err){
            console.log(err);
        }
}
async function deleteNote(nr){
    var sql = "DELETE FROM notes where NNr = "+nr+";";
        try{
            conn = await pool.getConnection()
            const rows = await conn.query(sql);
            conn.end();
            return rows;
        }catch(err){
            console.log(err);
        }
}

module.exports = {deleteNote,deleteProject,fetchNotes, insertEnv,fetchEnv, fetchProjects, fetchCompProjects, fetchIdeas, fetchPreview, insertProject, fetchByName, updateProject, insertNote, updateNote}
