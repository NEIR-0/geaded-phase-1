const {Pool} = require("pg") 

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'DIYPlatform',
  password: 'postgres',
  port: 5432,
  idleTimeoutMillis: 200
})
 
// async function test(){
//     try {
//         console.log(await pool.query('SELECT NOW()'))
//     } catch (error) {
//         console.log(error);
//     }
// }
// test()

module.exports = pool