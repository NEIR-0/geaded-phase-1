const Models = require("../Models/model")
class Controllers {
    static async homepage(req, res){
        try {
            const data = await Models.home()

            res.render("home", {
                data: data
            })
        } catch (error) {
            res.send(error)
        }
    }
    static async formShoes(req, res){
        try {
            const data = await Models.formShoes()
            const category = await Models.categories()
            // console.log(data);
            // console.log(category);


            res.render("addShoes", {
                data: data,
                category: category
            })
        } catch (error) {
            res.send(error)
        }
    }
    static async postShoes(req, res){
        try {
            const {name, category, minSize, maxSize, status} = req.body
            await Models.insertData(name, category, minSize, maxSize, status)

            res.redirect("/")
        } catch (error) {
            res.send(error)
        }
    }

    static async delete(req, res){
        try {
            const {id} = req.params
            const number = Number(id)
            await Models.delete(number)

            res.redirect("/")
        } catch (error) {
            res.send(error)
        }
    }

    static async updateAvailable(req, res){
        try {
            const {id} = req.params
            const number = Number(id)
            // console.log(number);
            const data = await Models.available(number)
            // console.log(data);

            res.redirect("/")
        } catch (error) {
            res.send(error)
        }
    }
    
}

module.exports = Controllers