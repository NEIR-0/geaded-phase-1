const {Pool} = require("pg")
 
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'simulasi-livecode',
  password: 'postgres',
  port: 5432,
  idleTimeoutMillis: 200
})
 
async function test(){
    console.log(await pool.query('SELECT NOW()'))
}
// test()

module.exports = pool