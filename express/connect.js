const mysql = require('mysql');
// Esse é o arquivo que estabelece as configurações para se conectar com o
// banco de dados local
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'reactnative'
});

// let command = `SELECT * FROM articles`;

// connection.query(command, (error, results, fields) => {
//     if (error) {
//         return console.error(error.message);
//     }
//     console.log(results);
//     console.log(results[0].title);
//     // console.log(fields);
// })

module.exports = connection;