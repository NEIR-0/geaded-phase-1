const pool = require("./connections")

const Authors = `CREATE TABLE "Authors"(
	"id" SERIAL PRIMARY KEY ,
	"fullName" VARCHAR (120) NOT NULL,
	"gender" VARCHAR (6) NOT NULL
)
`

const Posts = `CREATE TABLE "Posts"(
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR (100),
	"difficulty" VARCHAR (6),
	"estimatedTime" INTEGER,
	"description" TEXT,
	"totalVote" INTEGER,
	"imageUrl" VARCHAR (100),
	"createdDate" DATE,
	"AuthorId" INTEGER REFERENCES "Authors" ("id")
)
`

const drop = `DROP TABLE IF EXISTS "Authors", "Posts"`

async function migrations(){
    try {
		const dropTable = await pool.query(drop)
		const createAuthor = await pool.query(Authors)
		console.log(createAuthor);
		const createPost = await pool.query(Posts)
		console.log(createPost);
    } catch (error) {
        console.log(error);
    }
}

migrations()