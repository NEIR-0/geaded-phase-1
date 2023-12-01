const {Article } = require("../models/index") // panggil model

const authorizationAdminOnly = async (req, res, next) => {
    try {
        // console.log(req.user); // dapet dari "authentications.js"
        if(req.user.role === "admin"){
            next()
        }
        else if(req.user.role === "staff"){ // Hanya bisa edit miliknya
            const {id} = req.params // pake params dulu
            const article = await Article.findByPk(id) // taro params nya
            // console.log(article," ASDASDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDd");
            if(!article){
                throw {name: "Not found"}
            }
            // console.log(article);

            // console.log(article.id, req.user.id, article.id === req.user.id); 
            if(article.authorId === req.user.id){ // baru cek apakah "data.authorId" === "req.user.id"
                next() // lalu kita next
            }
            else{
                throw {name: "forbidden"}
            }
        }   
    } catch (error) {
        next(error)
    }
}

module.exports = authorizationAdminOnly