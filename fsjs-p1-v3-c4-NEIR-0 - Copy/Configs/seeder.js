const fs = require("fs")
const pool = require("./connections")

const authors = JSON.parse(fs.readFileSync("./data/authors.json", "utf-8")).map(el => {
    const {fullName, gender} = el
    return `('${fullName}', '${gender}')`
}).join(", \n")
// console.log(authors);

const seedAuthors = `INSERT INTO "Authors" ("fullName", "gender")
VALUES ${authors}`

// =======================================================================================================================
const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8")).map(el => {
    const {title, difficulty, estimatedTime, description, totalVote, imageUrl, createdDate, AuthorId,} = el
    return `('${title}', '${difficulty}', ${estimatedTime}, '${description}', ${totalVote}, '${imageUrl}', '${createdDate}', ${AuthorId} )`
}).join(", \n")
// console.log(posts);

const seedPosts = `INSERT INTO "Posts" ("title", "difficulty", "estimatedTime", "description", "totalVote", "imageUrl", "createdDate", "AuthorId")
VALUES ${posts}`


async function addItem(){
    try {
        const queryAuthor = await pool.query(seedAuthors)
        console.log(queryAuthor);
        const queryPost = await pool.query(seedPosts)
        console.log(queryPost);
    } catch (error) {
        console.log(error);
    }
}

addItem()