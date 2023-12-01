const {Article, User, Category } = require("../models/index")
const {compare} = require("../Helper/bcryptjs")
const {createToken} = require("../Helper/jwt")
const { Op, where } = require("sequelize");

// axios
// const axios = require("axios") // buat 3rd party
// cloudinary
const cloudinary = require("cloudinary")
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

class Controllers {
// Articles================================================================================================
    // createArticles
    static async createArticles(req, res, next){ // req, res, next
        try {
            let authorId = req.user.id // dapet dari "authentication.js"

            const {title, content, imgUrl, categoryId} = req.body
            // console.log(title, content, imgUrl, authorId, categoryId);
            const article = await Article.create({ title, content, imgUrl, authorId, categoryId });

            res.status(201).json({article})
        } catch (error) {
            console.log(error);
            next(error)
            // if(error.name === "SequelizeValidationError"){
            //     // ARRAY:
            //     // res.status(400).json({message: error.errors.map(el => {
            //     //     return el.message
            //     // })})

            //     // OBJECT:
            //     res.status(400).json({message: error.errors[0].message})
            // }
            // else{
            //     res.status(500).json({message: "Interval Server Error"})
            // }
        }
    }

    // show all
    static async articleList(req, res, next){ // req, res, next
        try {
            // filter
            let options = { // defaultin
                where: {}, 
                include:{ 
                    model:      , 
                    where: {} 
                }, 
                order: [["id", "asc"]]
            }
            
            // console.log(req.query.sort, req.query.directions, req.query.page, req.query.size, req.query.size, req.query.categories);
            if(req.query.categories){
                options.include.where.name = {[Op.eq]: `${req.query.categories}`} // bikin obj "name"
            }

            if(req.query.filter){
                options.where.title = { [Op.iLike]: `%${req.query.filter}%` }
            }

            // sort
            if(req.query.sort){
                options.order = [[req.query.sort, req.query.directions]] // bikin obj "order"
            }

            // pagination
            if(req.query.page){
                // rumus dinamis = (page - 1)*limit
                options.limit = req.query.size || 3 // limit || default
                options.offset = (req.query.page - 1) * options.limit // offset

                // limit - offset (default sequilize)
            }
            console.log(options);

            const article = await Article.findAll(options)
            res.status(200).json({count: article.length, article})
        } catch (error) {
            console.log(error);
            next(error)
            // res.status(500).json({message: "Interval Server Error"})
        }
    }

    // findArticles
    static async findArticles(req, res, next){ // req, res, next
        try {
            const { id } = req.params
            const article = await Article.findByPk(id)

            if(article === null){
                throw {name: "Not found", id: id} // biasain erronya di name
            }
            res.status(200).json({article})
        } catch (error) {
            console.log(error);
            next(error)
            // if(error.error === 'Not found'){
            //     res.status(404).json({message: `Data with id: ${error.id} ${error.error}`})
            // }
            // else{
            //     res.status(500).json({message: "Interval Server Error"})
            // }
        }
    }

    // updateArticles
    static async updateArticles(req, res, next){ // req, res, next
        try {
            let authorId = req.user.id // dapet dari "authentication.js"

            const { id } = req.params
            const {title, content, imgUrl, categoryId} = req.body
            const article = await Article.findByPk(id)
            if(article === null){
                throw {name: "Not found", id: id} // {name: erronya!}
            }

            await Article.update({ title, content, imgUrl, authorId, categoryId }, {
                where: {
                  id: id
                }
            });
            res.status(200).json({id: Number(id), title, content, imgUrl, authorId, categoryId})
        } catch (error) {
            console.log(error);
            next(error)
            // if(error.error === 'Not found'){
            //     res.status(404).json({message: `Data with id: ${error.id} ${error.error}`})
            // }
            // else if(error.name === "SequelizeValidationError"){
            //     // OBJECT:
            //     res.status(400).json({message: error.errors[0].message})
            // }
            // else{
            //     res.status(500).json({message: "Interval Server Error"})
            // }
        }
    }                                                                                           

    // deleteArticles
    static async deleteArticles(req, res, next){ // req, res, next
        try {
            const { id } = req.params
            const article = await Article.findByPk(id)
            if(article === null){
                throw {name: "Not found", id: id} // {name: erronya!}
            }

            await Article.destroy({
                where: {
                id: id
                }
            });
            res.status(200).json({message: `${article.title} success to delete`})
        } catch (error) {
            console.log(error);
            next(error)
            // if(error.error === 'Not found'){
            //     res.status(404).json({message: `Data with id: ${error.id} ${error.error}`})
            // }
            // else{
            //     res.status(500).json({message: "Interval Server Error"})
            // }
        }
    }  
    
// categories================================================================================================
    // createCategories
    static async createCategories(req, res, next){ // req, res, next
        try {
            const {name} = req.body
            const categories = await Category.create({ name });

            res.status(201).json({categories})
        } catch (error) {
            console.log(error);
            next(error)
            // if(error.name === "SequelizeValidationError"){
            //     // OBJECT:
            //     res.status(400).json({message: error.errors[0].message})
            // }
            // else{
            //     res.status(500).json({message: "Interval Server Error"})
            // }
        }
    }

    // categoriesList
    static async categoriesList(req, res, next){ // req, res, next
        try {
            const categories = await Category.findAll()
            res.status(200).json({categories})
        } catch (error) {
            console.log(error);
            next(error)
            // res.status(500).json({message: "Interval Server Error"})
        }
    }

    // updateCategories
    static async updateCategories(req, res, next){ // req, res, next
        try {
            const { id } = req.params
            const {name} = req.body
            const categories = await Category.findByPk(id)
            if(!categories){
                throw {name: "Not found", id: id}
            }

            await Category.update({ name }, {
                where: {
                  id: id
                }
            });
            res.status(200).json({id, name})
        } catch (error) {
            console.log(error);
            next(error)
            // if(error.error === 'Not found'){
            //     res.status(404).json({message: `Data with id: ${error.id} ${error.error}`})
            // }
            // else if(error.name === "SequelizeValidationError"){
            //     // OBJECT:
            //     res.status(400).json({message: error.errors[0].message})
            // }
            // else{
            //     res.status(500).json({message: "Interval Server Error"})
            // }
        }
    }     

    // deleteCategories
    static async deleteCategories(req, res, next){ // req, res, next
        try {
            const { id } = req.params
            const categories = await Category.findByPk(id)
            if(categories === null){
                throw {name: "Not found", id: id}
            }

            await Category.destroy({
                where: {
                id: id
                }
            });
            res.status(200).json({message: `${categories.name} success to delete`})
        } catch (error) {
            console.log(error);
            next(error)
            // if(error.error === 'Not found'){
            //     res.status(404).json({message: `Data with id: ${error.id} ${error.error}`})
            // }
            // else{
            //     res.status(500).json({message: "Interval Server Error"})
            // }
        }
    } 

// Auth================================================================================================
    // register
    static async register(req, res, next){ // req, res, next  
        try {
            const {email, password, phoneNumber, address} = req.body
            const user = await User.create({ email, password, phoneNumber, address });

            res.status(201).json({id: user.id, email: user.email, phoneNumber: user.phoneNumber, address: user.address}) // balikin jangan ama "passwordnya"
        } catch (error) {
            console.log(error);
            next(error)
            // if(error.name === "SequelizeValidationError"){
            //     // OBJECT:
            //     res.status(400).json({message: error.errors[0].message})
            // }
            // else{
            //     res.status(500).json({message: "Interval Server Error"})
            // }
        }
    }

    // login
    static async login(req, res, next){ // req, res, next
        try {
            const {email, password} = req.body
            if(!email) throw {name: "InvaliInput", field: "email"}
            if(!password) throw {name: "InvaliInput", field: "password"}

            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if(!user) throw {name: "Unauthenticated"}

            const compared = compare(password, user.password)
            if(!compared) throw {name: "Unauthenticated"}

            const token = createToken({id: user.id}) // harus dalam object
            // console.log(token);

            res.status(200).json({token, email: user.email, role: user.role})
        } catch (error) {
            console.log(error);
            next(error)
            // if(error.name === "InvaliInput"){
            //     res.status(400).json({message: `${error.field} cannot empty`}) // (400) => "validate"
            // }
            // else if(error.name === "Unauthenticated"){
            //     res.status(401).json({message: "username/password invalid"}) // status (401) => "Unauthenticated"
            // }
            // else{
            //     res.status(500).json({message: "Interval Server Error"})
            // }
        }
    }

// mutler================================================================================================
    // updateImgArticles
    static async updateImgArticles(req, res, next){ // ini cara pakai cloudinary
        try {
            const {id} = req.params
            // console.log(id, "<<<<<<<<<<<<<<<<");
            console.log(req.file);
            if(!req.file){
                throw {name: "InvalidImg"}
            }

            const file = 
            "data:" + req.file.mimetype + ";base64," + req.file.buffer.toString("base64") // defaultnya!
            // console.log(file); // string pangjang bed kayak potrait :V

            const response = await cloudinary.v2.uploader.upload(file,  {
                public_id: req.file.originalname,
            })
            // console.log(response);

            // update luh
            const data = await Article.findByPk(id)
            if(!data){
                throw {name: "Not found"}
            }
            // console.log(data.imgUrl);

            await Article.update({imgUrl: response.url }, {
                where: {
                  id: id
                }
            });

            res.status(200).json({message: `Image on article ${data.title} success to update`})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }     
}
    

module.exports = Controllers