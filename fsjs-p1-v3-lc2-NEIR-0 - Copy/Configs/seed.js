const pool = require("./connections")
const fs = require("fs")

const dataCategories = JSON.parse(fs.readFileSync("./data/categories.json"))
const categories = dataCategories.map(el => {
    return `('${el.name}')`
}).join(", \n")

const dataShoes = JSON.parse(fs.readFileSync("./data/shoes.json"))
const shoes = dataShoes.map(el => {
    return `('${el.name}', ${el.categoryId}, ${el.minSize}, ${el.maxSize}, '${el.status}')`
}).join(", \n")

const insertCategories = `INSERT INTO "Categories" ("name")
VALUES ${categories} `

const insertShoes = `INSERT INTO "Shoes" ("name", "categoryId", "minSize", "maxSize", "status")
VALUES ${shoes}`

async function insertTable(){
    try {
        const queryCategories = await pool.query(insertCategories)
        const queryShoes = await pool.query(insertShoes)
    } catch (error) {
        console.log(error);
    }
}

insertTable()