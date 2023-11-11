const pool = require("../Configs/connections")
const {Author, AuthorDetail, Post, PostDetail} = require("./class")
class Models {
    static async dataAuthor(){
        try {
            const query = `SELECT * FROM "Authors"`
            const setQuery = await pool.query(query)
            const data = setQuery.rows.map(el => {
                return new Author(el.id, el.fullName, el.gender)
            })
            
            return data
        } catch (error) {
            throw error
        }
    }
    static async detailAuthor(){
        try {
            const query = `SELECT 
            a.id,
            a."fullName",
            a.gender,
            count(p.id), 
            sum(p."totalVote"),
            CAST (avg(p."estimatedTime") AS FLOAT)
            FROM "Authors" AS a
            LEFT JOIN "Posts" AS p
            ON p."AuthorId" = a.id
            GROUP BY a.id 
            ORDER BY a.id  `
            const setQuery = await pool.query(query)
            const data = setQuery.rows.map(el => {
                let {id, fullName, gender, count, sum, avg} = el
                if(sum === null){
                    sum = 0
                }
                if(avg === null){
                    avg = 0
                }
                // id, fullName, gender, totalPost, totalVote, averageTime
                return new AuthorDetail(id, fullName, gender, count, sum, Math.round(avg).toFixed(2))
            })
            
            return data
        } catch (error) {
            throw error
        }
    }
    // search dan post
    static async dataPost(search){
        try {
            let query;
            if(!search){
                query = `SELECT 
                p.id,
                p.title,
                p.difficulty,
                p."totalVote" 
                FROM "Posts" p
                ORDER BY p."totalVote" DESC 
                `
            }
            else{
                query = `SELECT 
                p.id,
                p.title,
                p.difficulty,
                p."totalVote" 
                FROM "Posts" p
                WHERE p.title ILIKE '%${search}%'
                ORDER BY p."totalVote" DESC`
            }
            
            const setQuery = await pool.query(query)
            const data = setQuery.rows.map(el => {
                return new Post(el.id, el.title, el.difficulty, el.totalVote)
            })
            // console.log(data);
            return data
        } catch (error) {
            throw error
        }
    }
    static async detailPost(id){
        try {
            const query = `SELECT 
            p.id AS PostsId, 
            p.title,
            p.difficulty,
            p."totalVote",
            p."estimatedTime",
            p.description,
            p."imageUrl",
            p."createdDate",
            a.id AS AuthorId,
            a."fullName" 
            FROM "Posts" p
            JOIN "Authors" a 
            ON a.id = p."AuthorId" 
            WHERE p.id = ${id} 
            `
            // WHERE p.id = ${id}`
            const setQuery = await pool.query(query)
            const data = setQuery.rows.map(el => {
                // id, title, difficulty, totalVote, estimatedTime, description, imageUrl, createdDate, AuthorId, authorName
                return new PostDetail(el.postsid, el.title, el.difficulty, el.totalVote, el.estimatedTime, el.description, el.imageUrl, el.createdDate, el.authorid, el.fullName)
            })
            // console.log(data);
            return data
        } catch (error) {
            throw error
        }
    }
    // ADD
    static async addPost(title, authorId, difficulty, estimatedTime, imageUrl, createdDate, description){
        try {
            // console.log(title, authorId, difficulty, estimatedTime, imageUrl, createdDate, description);

            const test = await Models.validation(title, authorId, difficulty, estimatedTime, imageUrl, createdDate, description)

            if(test === true){
                const query = `INSERT INTO "Posts" ("title", "difficulty", "estimatedTime", "description", "totalVote", "imageUrl", "createdDate", "AuthorId")
                VALUES 
                ('${title}', '${difficulty}', ${estimatedTime}, '${description}', 0, '${imageUrl}', '${createdDate}', ${authorId})`

    
                const data = await pool.query(query)
    
                return data
            }
 
        } catch (error) {
            throw error
        }
    }

    // VALIDATION
    static async validation(title, authorId, difficulty, estimatedTime, imageUrl, createdDate, description){
        try {
            // console.log(title, authorId, difficulty , estimatedTime, imageUrl, createdDate, description);

            let arrError = []
            let obj = {}
            // title
            if(!title){
               obj.title = "Title is required"
            }
            else if(title.length > 100){
                obj.title = "Post title maximum character is 100."
            }

            // authorId
            if(!authorId){
                obj.authorId = "Author Id is required"
            }

            // difficulty
            if(!difficulty){
                obj.difficulty = "Difficulty is required"
            }

            // estimatedTime
            if(!estimatedTime){
                obj.estimatedTime = "EstimatedTime is required"
            }
            else if(estimatedTime < 5){
                obj.estimatedTime = "Minimum estimated time is 5 minutes."
            }

            // imageUrl
            if(!imageUrl){
                obj.imageUrl = "Image URL is required"
            }
            else if(imageUrl.length > 100){
                obj.imageUrl = "Image Url name maximum character is 100."
            }

            // createdDate
            const newDate = new Date()
            const year = newDate.getFullYear()
            let month = newDate.getMonth()
            if(month > 9){
                month = month
            }
            else{
                month = `0${month}`
            }
            let date = newDate.getDate()
            if(date > 9){
                date = date
            }
            else{
                date = `0${date}`
            }
            const today = `${year}-${month}-${date}`

            if(!createdDate){
                obj.createdDate = "Created Date is required"
            }
            else if(createdDate > today){
                obj.createdDate = "Maximum created date is today."
            }

            // description
            if(!description){
                obj.description = "Description is required"
            }
            else{
                // a b c d e f g h i j k
                const trim = description.trim()
                const count = trim.split(" ")
                // console.log(count);
                // console.log(count.length);
                if(count.length > 10){
                    obj.description = "Minimum word in description is 10."
                }
            }
            // console.log(obj);
            const test = Object.keys(obj).length
            if(test === 0){
                // console.log("hello");
                return true
            }
            else{
                arrError.push(obj)
                if(arrError.length > 0){
                    throw arrError
                }
            }
        } catch (error) {
            throw error
        }
    }

    // EDIT
    static async editPost(id){
        try {
            const query = `SELECT 
            p.id AS PostsId, 
            p.title,
            p.difficulty,
            p."totalVote",
            p."estimatedTime",
            p.description,
            p."imageUrl",
            p."createdDate",
            a.id AS AuthorId,
            a."fullName" 
            FROM "Posts" p
            JOIN "Authors" a 
            ON a.id = p."AuthorId" 
            WHERE p.id = ${id} 
            `
            const setQuery = await pool.query(query)
            const data = setQuery.rows
            // console.log(data);
            const instance = data.map(el => {
                // id, title, difficulty, totalVote, estimatedTime, description, imageUrl, createdDate, AuthorId, authorName
                return new PostDetail(el.postsid, el.title, el.difficulty, el.totalVote, el.estimatedTime, el.description, el.imageUrl, el.createdDate, el.authorid, el.fullName)
            })

            return instance
        } catch (error) {
            throw error
        }
    }
    // UPDATE
    static async updatePost(title, authorId, difficulty, estimatedTime, imageUrl, createdDate, description, totalVote, id){
        try {
            const test = await Models.validation(title, authorId, difficulty, estimatedTime, imageUrl, createdDate, description)

            if(test === true){
                // bambang 1 hard 12 bambang 2023-09-01 bambang 30
                const query = `UPDATE "Posts"
                SET 
                "title" = '${title}',
                "AuthorId" = ${authorId},
                difficulty = '${difficulty}',
                "estimatedTime" = ${estimatedTime},
                "imageUrl" = '${imageUrl}',
                "createdDate" = '${createdDate}',
                description  = '${description}',
                "totalVote" = ${totalVote}
                WHERE id = ${id}`
        
                // console.log(query);
                const data = await pool.query(query)

                return data
            }
        } catch (error) {
            throw error
        }
    }
    // DELETE
    static async deletePost(id){
        try {
            const query = `DELETE 
            FROM "Posts" 
            WHERE id = ${id}`
            // WHERE p.id = ${id}`
            const setQuery = await pool.query(query)
            const data = setQuery.rows
            return data
        } catch (error) {
            throw error
        }
    }
    // VOTE
    static async votePost(id){
        try {
            const data = await Models.dataPost()
            const filtering = data.find(el => el.id === id)
            let vote = filtering.totalVote
            vote+=1 
            
            const query = `UPDATE "Posts" 
            SET 
            "totalVote" = ${vote}
            WHERE id = ${id}
            `
            await pool.query(query)

            return filtering
        } catch (error) {
            throw error
        }
    }
}
// Models.editPost(2)
module.exports = Models