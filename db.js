async function connect(){
    if (global.conn && global.conn.state !== 'disconnected')
        return global.conn;
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection("mysql://academico:123456@localhost:3306/academico");
    console.log("Conectado ao MySql");
    global.conn = conn;
    return conn;
}

//connect();

async function selectAlunos(){
    const conn = await connect();
    const [linhas] = await conn.query('Select * from alunos;');
    return linhas;
}
module.exports = {connect,selectAlunos}