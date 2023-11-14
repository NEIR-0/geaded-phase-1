const pool = require("../Configs/connections")
const {ProductionHouse, Movies} = require("./class")

class Models {
    static async showProductionHouse(){
        try {
            const query = `
            SELECT * 
            FROM 
            "ProductionHouses" ph 
            ORDER BY "name_prodHouse" ASC 
            `
            const rawData = await pool.query(query)
            const data = rawData.rows.map(el => {
                return new ProductionHouse(el.id, el.name_prodHouse, el.headquarters)
            })
            // console.log(data);

            return data
        } catch (error) {
            throw error
        }
    }
    static async showMovie(){
        try {
            const query = `
            SELECT * 
            FROM 
            "ProductionHouses" ph 
            JOIN "Movies" m 
            ON m."ProductionHouseId" = ph.id 
            `
            const rawData = await pool.query(query)
            // console.log(rawData.rows);
            const data = rawData.rows.map(el => {
                // name, headquarters, nameMovies, released_year, genre, ProductionHouseId
                
                return new Movies(el.id, el.name_prodHouse, el.headquarters, el.name, el.released_year, el.genre, el.ProductionHouseId)
            })
            // console.log(data);

            return data
        } catch (error) {
            throw error
        }
    }
    static async addMovie(){
        try {
            const query = `
            SELECT * 
            FROM 
            "ProductionHouses" ph 
            JOIN "Movies" m 
            ON m."ProductionHouseId" = ph.id 
            `
            const rawData = await pool.query(query)
            // console.log(rawData.rows);
            const data = rawData.rows.map(el => {
                // name, headquarters, nameMovies, released_year, genre, ProductionHouseId
                return new Movies(el.name_prodHouse, el.headquarters, el.name, el.released_year, el.genre, el.ProductionHouseId)
            })
            // console.log(data);

            return data
        } catch (error) {
            throw error
        }
    }
    static async addingDataMovie(name, relesedYear, genre, productionHouse){
        try {
            // valdiation
            await Models.validation(name, relesedYear)

            const query = `
            INSERT INTO "Movies"  ("name" , "released_year", "genre", "ProductionHouseId")
            VALUES ('${name}', ${relesedYear}, '${genre}', ${productionHouse})
            `
            // console.log(query);

            await pool.query(query)
        } catch (error) {
            throw error
        }
    } 
    static async delMovie(id){
        try {
            const query = `
            DELETE FROM "Movies" m  
            WHERE m.id = ${id}
            `
            // console.log(query);

            await pool.query(query)
        } catch (error) {
            throw error
        }
    } 
    static async editMovie(id){
        try {
            const query = `
            SELECT * 
            FROM 
            "ProductionHouses" ph 
            JOIN "Movies" m 
            ON m."ProductionHouseId" = ph.id 
            WHERE m.id = ${id}
            `
            const rawData = await pool.query(query)
            // console.log(rawData.rows);
            const data = rawData.rows.map(el => {
                // name, headquarters, nameMovies, released_year, genre, ProductionHouseId
                return new Movies(el.id, el.name_prodHouse, el.headquarters, el.name, el.released_year, el.genre, el.ProductionHouseId)
            })
            // console.log(data);

            return data
        } catch (error) {
            throw error
        }
    }
    static async updateMovie(id, name, relesedYear, genre, productionHouse){
        try {
            // valdiation
            await Models.validation(name, relesedYear)

            const query = `
            UPDATE "Movies" 
            SET 
            "name" = '${name}',
            "released_year" = ${relesedYear},
            "genre" = '${genre}',
            "ProductionHouseId" = ${productionHouse}
            WHERE id = ${id}
            `
            // console.log(query);

            await pool.query(query)
        } catch (error) {
            throw error
        }
    } 

    // VALIDATION
    static async validation(name, relesedYear){
        try {
            let arrError = []
            if(!name){
                arrError.push("tidak boleh kosong")
            }
            // released_year maksimal tahun 2021
            if(relesedYear > 2021 ){
                arrError.push("maksimal tahun 2021")
            }

            if(arrError.length > 0){
                throw arrError
            }

        } catch (error) {
            throw error
        }
    }    
}

module.exports = Models