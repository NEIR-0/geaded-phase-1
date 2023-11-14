const fs = require("fs")
const pool = require("./connections")

const dataProductionHouses  = JSON.parse(fs.readFileSync("./productionHouses.json", "utf-8"))

const queryPh = dataProductionHouses.map(el => {
    return `('${el.name}', '${el.headquarters}')`
}).join(", \n")
// console.log(query);

const insertPh = `INSERT INTO "ProductionHouses" ("name_prodHouse", "headquarters")
VALUES ${queryPh}`


const dataMovie  = JSON.parse(fs.readFileSync("./movie.json", "utf-8"))

const queryMovie = dataMovie.map(el => {
    return `('${el.name}', ${el.released_year}, '${el.genre}', ${el.ProductionHouseId})`
}).join(", \n")
// console.log(queryMovie);

const insertMovie = `INSERT INTO "Movies"  ("name" , released_year, genre, "ProductionHouseId")
VALUES ${queryMovie}`


async function insertTable(){
    try {
        const insertDataPh = await pool.query(insertPh)
        // console.log(insertDataPh);
        const insertDataMovie = await pool.query(insertMovie)
        // console.log(insertDataMovie);

    } catch (error) {
        console.log(error);
    }
}
insertTable()

