const Models = require("../Models/models")
class Controllers {
    static async homepage(req, res){
        try {
            res.render("homepage", {
                title: "homepage"
            })
        } catch (error) {
            res.send(error)
        }
    }
    static async showProductionHouse(req, res){
        try {
            const data = await Models.showProductionHouse()
            res.render("showProductionHouse", {
                data: data
            })
        } catch (error) {
            res.send(error)
        }
    }
    static async showMovie(req, res){
        try {
            const data = await Models.showMovie()
            const ph = await Models.showProductionHouse()

            res.render("showMovie", {
                data:  data
            })
        } catch (error) {
            res.send(error)
        }
    }

    // add
    static async addMovie(req, res){
        try {
            // Validation
            const {error} = req.query
            // console.log(error);
            const dataEror = error.split(",")
            // console.log(dataEror);

            const data = await Models.showMovie()

            res.render("addMovie", {
                data:  data,
                dataEror: dataEror
            })
        } catch (error) {
            res.send(error)
        }
    }
    static async postMovie(req, res){
        try {
            const {name, relesedYear, genre, productionHouse} = req.body
            await Models.addingDataMovie(name, relesedYear, genre, productionHouse)
            
            res.redirect("/movies")
        } catch (error) {
            res.redirect(`/movies/add?error=${error}`)
        }
    }

    // delete
    static async delMovie(req, res){
        try {
            const {id} = req.params
            const numberId = Number(id)
            await Models.delMovie(numberId)

            res.redirect("/movies")
        } catch (error) {
            res.send(error)
        }
    }

    // update
    static async editMovie(req, res){
        try {
            // Validation
            const {error} = req.query
            const dataEror = error.split(",")
            // console.log(dataEror);

            const {id} = req.params
            const numberId = Number(id)
            // console.log(numberId);

            const data = await Models.editMovie(numberId)
            const productionHouse = await Models.showProductionHouse()
            // console.log(data);
            // console.log(productionHouse);

            res.render("editMovie", {
                data:  data[0],
                productionHouse: productionHouse,
                dataEror: dataEror
            })
        } catch (error) {
            res.send(error)
        }
    }
    static async postEdit(req, res){
        try {
            const {id} = req.params
            const numberId = Number(id)
            const {name, relesedYear, genre, productionHouse} = req.body
            // console.log(name, Number(relesedYear), genre, Number(productionHouse));

            await Models.updateMovie(numberId, name, relesedYear, genre, productionHouse)
            
            res.redirect("/movies")
        } catch (error) {
            const {id} = req.params
            res.redirect(`/movies/edit/${id}?error=${error}`)
        }
    }

}

module.exports = Controllers