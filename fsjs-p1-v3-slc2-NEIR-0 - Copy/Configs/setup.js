const pool = require("./connections")

const ProductionHouses = `
CREATE TABLE "ProductionHouses"(
	"id" SERIAL PRIMARY KEY,
	"name_prodHouse" VARCHAR (255),
	"headquarters" VARCHAR (255)
)
`

const Movies = `
CREATE TABLE "Movies"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (255),
	"released_year" INTEGER,
	"genre" VARCHAR (255),
	"ProductionHouseId" INTEGER REFERENCES "ProductionHouses" ("id") 
)
`

const drop = `DROP TABLE IF EXISTS "ProductionHouses", "Movies"`


async function createTable(){
    try {
        const dropTable = await pool.query(drop)
        const ProductionHousesTable = await pool.query(ProductionHouses)
        console.log(ProductionHousesTable);
        const MoviesTable = await pool.query(Movies)
        console.log(MoviesTable);


    } catch (error) {
        console.log(error);
    }
}

createTable()