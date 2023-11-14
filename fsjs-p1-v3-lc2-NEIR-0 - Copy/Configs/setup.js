const pool = require("./connections")

const tableCategories = `CREATE TABLE "Categories" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR NOT NULL
)`
const tableShoes = `CREATE TABLE "Shoes" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR NOT NULL,
	"categoryId" INTEGER REFERENCES "Categories" ("id"),
	"minSize" INTEGER NOT NULL,
	"maxSize" INTEGER NOT NULL,
	"status" VARCHAR NOT NULL
)`
const dropTable = `DROP TABLE IF EXISTS "Categories", "Shoes"`

async function createTable(){
    try {
        const delTable = await pool.query(dropTable)
        const createCategories = await pool.query(tableCategories)
        const delShoes = await pool.query(tableShoes)
    } catch (error) {
        console.log(error);
    }
}

createTable()

