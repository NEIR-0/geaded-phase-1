const Models = require("../Models/model")

class Controllers {
    static async homepage(req, res){
        try {
            res.render("homepage", {
                title: "udin"
            })
        } catch (error) {
            res.send(error)
        }
    }
    static async author(req, res){
        try {
            const data = await Models.dataAuthor()

            res.render("author", {
                title: "list author",
                data: data
            })
        } catch (error) {
            res.send(error)
        }
    }
    static async detailAuthor(req, res){
        try {
            const data = await Models.detailAuthor()
            
            res.render("detailAuthor", {
                title: "detail author",
                data: data
            })
        } catch (error) {
            res.send(error)
        }
    }
    // search dan post
    static async post(req, res){
        try {
            const query = req.query
            const search = query.search
            const data = await Models.dataPost(search)
            // console.log(data);

            res.render("post", {
                title: "list post",
                data: data
            })
        } catch (error) {
            res.send(error)
        }
    }
    static async detailPost(req, res){
        try {
            const params = req.params
            const id = params.id
            // res.send(id)
            const data = await Models.detailPost(id)
            // console.log(data);
            res.render("detailPost", {
                title: "detail post",
                data: data[0]
            })
        } catch (error) {
            res.send(error)
        }
    }

    // untuk ADD
    static async showForm(req, res){
        try {
            // VALIDASI add
            const title = req.query.title
            const authorId = req.query.authorId
            const difficulty = req.query.difficulty
            const estimatedTime = req.query.estimatedTime
            const imageUrl = req.query.imageUrl
            const createdDate = req.query.createdDate
            const description = req.query.description


            const data = await Models.dataAuthor()
            // console.log(data);
            res.render("addPost", {
                title: "add post",
                data: data,
                title, 
                authorId, 
                difficulty, 
                estimatedTime, 
                imageUrl, 
                createdDate, 
                description
            })
        } catch (error) {
            res.send(error)
        }
    }
    static async postForm(req, res){
        try {
            const {title, authorId, difficulty, estimatedTime, imageUrl, createdDate, description} = req.body

            // console.log(title, Number(authorId), difficulty, Number(estimatedTime), imageUrl, createdDate, description);

            await Models.addPost(title, Number(authorId), difficulty, Number(estimatedTime), imageUrl, createdDate, description)
            
            res.redirect("/posts")
        } catch (error) {
            const check = error[0]
            // console.log(Object.keys(check).length === 0); // good things!
            if(Object.keys(check).length > 0){
                // VALIDATION
                const err = error[0]
                // title, authorId, difficulty, estimatedTime, imageUrl, createdDate, description

                res.redirect(`/posts/add?title=${err.title}&authorId=${err.authorId}&difficulty=${err.difficulty}&estimatedTime=${err.estimatedTime}&imageUrl=${err.imageUrl}&createdDate=${err.createdDate}&description=${err.description}`)
            }
        }
    }

    // UPDATE
    static async editPost(req, res){
        try {
            // VALIDASI add
            const title = req.query.title
            const authorId = req.query.authorId
            const difficulty = req.query.difficulty
            const estimatedTime = req.query.estimatedTime
            const imageUrl = req.query.imageUrl
            const createdDate = req.query.createdDate
            const description = req.query.description
            
            const params = req.params
            const id = Number(params.id)
            const data = await Models.editPost(id)
            const author = await Models.dataAuthor()
            // console.log(data[0]);
            // console.log(data[0].createdDate);
            // console.log(data[0].formatCreatedDate);

            res.render("editPost", {
                title: "edit file",
                data: data[0],
                author: author,
                title, 
                authorId, 
                difficulty, 
                estimatedTime, 
                imageUrl, 
                createdDate, 
                description
            })
        } catch (error) {
            res.send(error)
        }
    }
    static async updateForm(req, res){
        try {
            const {title, authorId, difficulty, estimatedTime, imageUrl, createdDate, description} = req.body
            const params = req.params
            const id = Number(params.id)
            
            const data = await Models.dataPost()
            const totalVote = data.find(el => el.id === id)
            // console.log(title, Number(authorId), difficulty, Number(estimatedTime), imageUrl, createdDate, description, totalVote.totalVote);

            await Models.updatePost(title, Number(authorId), difficulty, Number(estimatedTime), imageUrl, createdDate, description, totalVote.totalVote, id)
            
            res.redirect("/posts")
        } catch (error) {
            const params = req.params
            const id = Number(params.id)
            const check = error[0]
            // console.log(Object.keys(check).length === 0); // good things!
            if(Object.keys(check).length > 0){
                // VALIDATION
                const err = error[0]
                // title, authorId, difficulty, estimatedTime, imageUrl, createdDate, description

                res.redirect(`/posts/${id}/edit?title=${err.title}&authorId=${err.authorId}&difficulty=${err.difficulty}&estimatedTime=${err.estimatedTime}&imageUrl=${err.imageUrl}&createdDate=${err.createdDate}&description=${err.description}`)
            }
        }
    }

    // delete
    static async deletePost(req, res){
        try {
            const params = req.params
            const id = params.id
            await Models.deletePost(id)
            res.redirect("/posts")
        } catch (error) {
            res.send(error)
        }
    }

    // vote
    static async votePost(req, res){
        try {
            const params = req.params
            const id = Number(params.id)
            await Models.votePost(id)

            res.redirect(`/posts/${id}`)
        } catch (error) {
            res.send(error)
        }
    }
}
// Controllers.editPost()
module.exports = Controllers
