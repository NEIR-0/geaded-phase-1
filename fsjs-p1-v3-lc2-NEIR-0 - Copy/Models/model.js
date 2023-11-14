const pool = require("../Configs/connections")
const {Display, Form, Categories} = require("./class")

class Models {
    static async home(){
        try {
            //     yang terdiri dari kolom id, name, category, size, status, dan action.
            const query = `
            SELECT * 
            FROM "Categories" c 
            JOIN "Shoes" s 
            ON s."categoryId" = c.id
            ORDER BY s.id  ASC
            `

            const rawData = await pool.query(query)
            const data = rawData.rows.map(el => {
                // id, name, category, size, status, dan action.
                return new Display(el.id, el.name, el.categoryId, el.minSize, el.maxSize, el.status)
            })
            
            return data
        } catch (error) {
            throw error
        }
    }

    // formShoes
    static async formShoes(){
        try {
            // name, category, size, status, dan action.
            const query = `
            SELECT
            c.id,
            c."name" AS nameCategory,
            s.id ,
            s."name" ,
            s."categoryId" ,
            s."minSize" ,
            s."maxSize" ,
            s.status 
            FROM "Categories" c 
            JOIN "Shoes" s 
            ON s."categoryId" = c.id `

            const rawData = await pool.query(query)
            const data = rawData.rows.map(el => {
                // id, name, category, size, status, dan action.
                return new Form(el.id, el.name, el.categoryId, el.minSize, el.maxSize, el.status, el.namecategory)
            })
            // console.log(data);
            
            return data
        } catch (error) {
            throw error
        }
    }
    static async insertData(name, category, minSize, maxSize, status){
        try {
            // Validation
            await Models.addValidation(name, category, minSize, maxSize, status)
            
            const query = `
            INSERT INTO "Shoes" ("name", "categoryId", "minSize", "maxSize", status)
            Values
            ('${name}', ${category}, ${minSize}, ${maxSize}, '${status}')
            `
            await pool.query(query)

        } catch (error) {
            throw error
        }
    }
    static async addValidation(name, category, minSize, maxSize, status){
        try {
            // name minimal 2 kata
            // minSize dan maxSize hanya boleh angka
            // maxSize harus lebih besar dari minSize
            // console.log(name, category, minSize, maxSize, status);
            let arrError = []
            const nameLong = name.split(" ")
            // console.log(nameLong);
            // console.log(nameLong.length);
            
            if(nameLong.length < 2 ){
                arrError.push("Name must have atleast two word")
            }

            if(isNaN(minSize) === true || isNaN(maxSize) === true){
                arrError.push("minSize and maxSize must be number")
            }
            
            if(Number(maxSize) < Number(minSize)){
                arrError.push("maxSize must be bigger than minSize")
            }
            

            if(arrError.length > 0){
                throw arrError
            }

        } catch (error) {
            throw error
        }
    }

    // delete
    static async delete(id){
        try {
            const data = await Models.home()
            const find = data.find(el => el.id === id)
            console.log(find);
            // Hanya sepatu dengan status Discontinued yang dapat dihapus
            if(find.status === "Discontinued"){
                const query = `
                DELETE FROM  "Shoes" s
                WHERE s.id = ${id}`    
                await pool.query(query)
            }
            else{
                throw "You can only delete Discontinued status"
            }
           
        } catch (error) {
            throw error
        }
    }
    static async available(id){
        try {
            const data = await Models.home()
            const find = data.find(el => el.id === id)
            let query;
            if(find.status === "Available"){
                query = `
                UPDATE "Shoes" s
                SET status = 'Discontinued' 
                WHERE id = ${id}`
            }
            else{
                query = `
                UPDATE "Shoes" s
                SET status = 'Available' 
                WHERE id = ${id}`
            }
            // console.log(query);

            await pool.query(query)
        } catch (error) {
            throw error
        }
    }

    static async categories(){
        try {
           
            const query = `
            SELECT * 
            FROM "Categories" c 
            ORDER BY c.id  ASC
            `

            const rawData = await pool.query(query)
            const data = rawData.rows.map(el => {
                // id, name, category, size, status, dan action.
                return new Categories(el.id, el.name)
            })
            
            return data
        } catch (error) {
            throw error
        }
    }
}

module.exports = Models
