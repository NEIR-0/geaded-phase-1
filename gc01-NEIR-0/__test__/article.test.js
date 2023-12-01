const request = require("supertest") // panggil supertest
const app = require("../app") // panggil app
const {User, Article, Category} = require("../models/index") // panggil User models
const {hashing} = require("../Helper/bcryptjs")

let token
beforeAll(async () => { // tambahin "async"
    await User.bulkCreate([ // pake array of obj
        {
            "email": "udinpetod@gmail.com",
            "password": hashing("1234"), // harus hashing
            "role": "admin"
        },
        {
            "email": "koko@gmail.com",
            "password": hashing("1234"), // harus hashing
            "role": "staff"
        }
    ])

    await Category.bulkCreate([
        {
            "name": "sport"
        },
    ])

    await Article.bulkCreate([
        {
            "title": "bu me..", 
            "content": "kokoas", 
            "imgUrl": "disni", 
            "categoryId": 1,
            "authorId": 1,
            "createdAt": "2023-11-02 15:39:37.500 +0700",
            "updatedAt": "2023-11-02 15:39:37.500 +0700"
        },
        {
            "title": "bsiapasd.", 
            "content": "kokoas", 
            "imgUrl": "disni", 
            "categoryId": 1,
            "authorId": 1,
            "createdAt": "2023-11-02 15:39:37.500 +0700",
            "updatedAt": "2023-11-02 15:39:37.500 +0700"
        },
        {
            "title": "siapa", 
            "content": "sxixii", 
            "imgUrl": "lololoh", 
            "categoryId": 1,
            "authorId": 2,
            "createdAt": "2023-11-02 15:39:37.500 +0700",
            "updatedAt": "2023-11-02 15:39:37.500 +0700"

        }
    ])
});

afterAll(async  () => {
    await User.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    })

    await Category.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    })

    // Article
    await Article.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
});

describe("Post /articles", () => {
    test("return object title, content, imgUrl, categoryId, authorId", async () => {
        // test login
        const user = { 
            "email": "udinpetod@gmail.com",
            "password": "1234",
        }
        const login = await request(app).post("/login").send(user) // panggil endpoint  
        // console.log(login.body);
        token = login.body.token

        
        const article = {
            "title": "bu me..", 
            "content": "kokoas", 
            "imgUrl": "disni", 
            "categoryId": 1,
            "authorId": 1
        }
        const response = await request(app)
        .post("/articles")
        .set("Authorization", `Bearer ${token}`)
        .send(article)
        
        // console.log(token, "<<<<<<<<<<<<<<<");
        console.log(response.body, "<<<<<<<<");
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body.article).toHaveProperty("id", expect.any(Number))
        expect(response.body.article).toHaveProperty("title", expect.any(String))
        expect(response.body.article).toHaveProperty("content", expect.any(String))
        expect(response.body.article).toHaveProperty("imgUrl", expect.any(String))
        expect(response.body.article).toHaveProperty("authorId", expect.any(Number))
        expect(response.body.article).toHaveProperty("categoryId", expect.any(Number))
        expect(response.body.article).toHaveProperty("updatedAt", expect.any(String))
        expect(response.body.article).toHaveProperty("createdAt", expect.any(String))
    })

    test("return message not login", async () => {
        const article = {
            "title": "bu me..", 
            "content": "kokoas", 
            "imgUrl": "disni", 
            "categoryId": 1,
            "authorId": 1
        }
        const response = await request(app)
        .post("/articles")
        .send(article)
        
        // console.log(token, "<<<<<<<<<<<<<<<");
        // console.log(response.body, "<<<<<<<<");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })

    test("return message Invalid Token", async () => {
        const token = "asdasdasda"
        const article = {
            "title": "bu me..", 
            "content": "kokoas", 
            "imgUrl": "disni", 
            "categoryId": 1,
            "authorId": 1
        }
        const response = await request(app)
        .post("/articles")
        .set("Authorization", `Bearer ${token}`)
        .send(article)
        
        // console.log(token, "<<<<<<<<<<<<<<<");
        // console.log(response.body, "<<<<<<<<");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })

    test("return message validate title", async () => {
        const article = {
            "title": "", 
            "content": "kokoas", 
            "imgUrl": "disni", 
            "categoryId": 1,
            "authorId": 1
        }
        const response = await request(app)
        .post("/articles")
        .set("Authorization", `Bearer ${token}`)
        .send(article)
        
        // console.log(token, "<<<<<<<<<<<<<<<");
        // console.log(response.body, "<<<<<<<<");
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "title can't empty")
    })

    test("return message validate content", async () => {
        const article = {
            "title": "udinannasnasn", 
            "content": "", 
            "imgUrl": "disni", 
            "categoryId": 1,
            "authorId": 1
        }
        const response = await request(app)
        .post("/articles")
        .set("Authorization", `Bearer ${token}`)
        .send(article)
        
        // console.log(token, "<<<<<<<<<<<<<<<");
        // console.log(response.body, "<<<<<<<<");
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "content can't empty")
    })
})

describe("Get /articles", () => {
    test("return all data articles", async () => {
        const response = await request(app)
        .get("/articles")
        .set("Authorization", `Bearer ${token}`)


        console.log(response.body.article[0], "<<<<<<<<<<<<");
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)

        // validate data
        expect(response.body.article[0]).toHaveProperty("id", expect.any(Number))
        expect(response.body.article[0]).toHaveProperty("title", expect.any(String))
        expect(response.body.article[0]).toHaveProperty("content", expect.any(String))
        expect(response.body.article[0]).toHaveProperty("imgUrl", expect.any(String))
        expect(response.body.article[0]).toHaveProperty("authorId", expect.any(Number))
        expect(response.body.article[0]).toHaveProperty("categoryId", expect.any(Number))
        expect(response.body.article[0]).toHaveProperty("updatedAt", expect.any(String))
        expect(response.body.article[0]).toHaveProperty("createdAt", expect.any(String))
    })

    test("return message not login", async () => {
        const response = await request(app)
        .post("/articles")
        
        // console.log(token, "<<<<<<<<<<<<<<<");
        // console.log(response.body, "<<<<<<<<");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })

    test("return message Invalid Token", async () => {
        const token = "asdasdasda"
        const response = await request(app)
        .post("/articles")
        .set("Authorization", `Bearer ${token}`)
        
        // console.log(token, "<<<<<<<<<<<<<<<");
        // console.log(response.body, "<<<<<<<<");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })
})

describe("Get /articles/:id", () => {
    test("return articles by id", async () => {
        const response = await request(app)
        .get("/articles/1")
        .set("Authorization", `Bearer ${token}`)

        // console.log(response.body.article, "<<<<<<<<<<<<");
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)

        // validate data
        expect(response.body.article).toHaveProperty("id", expect.any(Number))
        expect(response.body.article).toHaveProperty("title", expect.any(String))
        expect(response.body.article).toHaveProperty("content", expect.any(String))
        expect(response.body.article).toHaveProperty("imgUrl", expect.any(String))
        expect(response.body.article).toHaveProperty("authorId", expect.any(Number))
        expect(response.body.article).toHaveProperty("categoryId", expect.any(Number))
        expect(response.body.article).toHaveProperty("updatedAt", expect.any(String))
        expect(response.body.article).toHaveProperty("createdAt", expect.any(String))
    })

    test("return message not login", async () => {
        const response = await request(app)
        .post("/articles/1")
        
        // console.log(token, "<<<<<<<<<<<<<<<");
        // console.log(response.body, "<<<<<<<<");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })

    test("return message Invalid Token", async () => {
        const token = "asdasdasda"
        const response = await request(app)
        .post("/articles/1")
        .set("Authorization", `Bearer ${token}`)
        
        // console.log(token, "<<<<<<<<<<<<<<<");
        // console.log(response.body, "<<<<<<<<");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })

    // test params undifined
    test("return params undifined", async () => {
        const response = await request(app)
        .get("/articles/5")
        .set("Authorization", `Bearer ${token}`)

        // console.log(response.body.article, "<<<<<<<<<<<<");
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
    })
})

describe("Put /articles/:id", () => {
    test("return id, title, content, imgUrl, authorId, categoryId", async () => {
        const article = {
            "title": "bokok", 
            "content": "kokoas", 
            "imgUrl": "asdasd", 
            "categoryId": 1,
            "authorId": 1
        }

        const response = await request(app)
        .put("/articles/1")
        .set("Authorization", `Bearer ${token}`)
        .send(article)

        console.log(response.body, "<<<<<<<<<<<<");
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("id", expect.any(Number))
        expect(response.body).toHaveProperty("title", expect.any(String))
        expect(response.body).toHaveProperty("content", expect.any(String))
        expect(response.body).toHaveProperty("imgUrl", expect.any(String))
        expect(response.body).toHaveProperty("authorId", expect.any(Number))
        expect(response.body).toHaveProperty("categoryId", expect.any(Number))
    })

    test("return message not login", async () => {
        const article = {
            "title": "bokok", 
            "content": "kokoas", 
            "imgUrl": "asdasd", 
            "categoryId": 1,
            "authorId": 1
        }

        const response = await request(app)
        .post("/articles/1")
        .send(article)
        
        // console.log(token, "<<<<<<<<<<<<<<<");
        // console.log(response.body, "<<<<<<<<");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })

    test("return message Invalid Token", async () => {
        const article = {
            "title": "bokok", 
            "content": "kokoas", 
            "imgUrl": "asdasd", 
            "categoryId": 1,
            "authorId": 1
        }
        const token = "asdasdasda"

        const response = await request(app)
        .post("/articles/1")
        .set("Authorization", `Bearer ${token}`)
        .send(article)
        
        // console.log(token, "<<<<<<<<<<<<<<<");
        // console.log(response.body, "<<<<<<<<");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })

    // test params undifined
    test("return params undifined", async () => {
        const article = {
            "title": "bokok", 
            "content": "kokoas", 
            "imgUrl": "asdasd", 
            "categoryId": 1,
            "authorId": 1
        }

        const response = await request(app)
        .get("/articles/100")
        .set("Authorization", `Bearer ${token}`)
        .send(article)

        console.log(response.body, "<<<<<<<<<<<<");
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'data not found')
    })

    test("return forbidden", async () => {
        // test login
        const user = { 
            "email": "koko@gmail.com",
            "password": "1234",
        }
        const login = await request(app)
        .post("/login")
        .send(user) 
        // console.log(login.body, "<<<<<<<<<<<<<<<<");
        token = login.body.token
        
        const article = {
            "title": "bokok", 
            "content": "kokoas", 
            "imgUrl": "asdasd", 
            "categoryId": 1,
            "authorId": 1
        }

        const response = await request(app)
        .put("/articles/1")
        .set("Authorization", `Bearer ${token}`)
        .send(article)

        // console.log(response.body, "<<<<<<<<<<<<");
        expect(response.status).toBe(403)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'forbidden acces !')
    })

    test("return validate title", async () => {
        // test login
        const user = { 
            "email": "udinpetod@gmail.com",
            "password": "1234",
        }
        const login = await request(app).post("/login").send(user) // panggil endpoint  
        console.log(login.body, "<<<<<<<<<<<<<");
        token = login.body.token

        const article = {
            "title": "", 
            "content": "kokoas", 
            "imgUrl": "asdasd", 
            "categoryId": 1,
            "authorId": 1
        }

        const response = await request(app)
        .put("/articles/1")
        .set("Authorization", `Bearer ${token}`)
        .send(article)

        console.log(response.body, "<<<<<<<<<<<<");
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "title can't empty")
    })

    test("return validate content", async () => {
        // test login
        const user = { 
            "email": "udinpetod@gmail.com",
            "password": "1234",
        }
        const login = await request(app).post("/login").send(user) // panggil endpoint  
        console.log(login.body, "<<<<<<<<<<<<<");
        token = login.body.token

        const article = {
            "title": "ssss", 
            "content": "", 
            "imgUrl": "asdasd", 
            "categoryId": 1,
            "authorId": 1
        }

        const response = await request(app)
        .put("/articles/1")
        .set("Authorization", `Bearer ${token}`)
        .send(article)

        console.log(response.body, "<<<<<<<<<<<<");
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "content can't empty")
    })
})

describe("Delete /articles/:id", () => {
    test("return success delete", async () => {
        const response = await request(app)
        .delete("/articles/1")
        .set("Authorization", `Bearer ${token}`)

        console.log(response.body, "<>>>><><>>>>");
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message",'bokok success to delete')
    })

    test("return message not login", async () => {
        const response = await request(app)
        .delete("/articles/1")
        
        // console.log(token, "<<<<<<<<<<<<<<<");
        // console.log(response.body, "<<<<<<<<");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })

    test("return message Invalid Token", async () => {
        const token = "asdasdasda"
        const response = await request(app)
        .delete("/articles/1")
        .set("Authorization", `Bearer ${token}`)
        
        // console.log(token, "<<<<<<<<<<<<<<<");
        // console.log(response.body, "<<<<<<<<");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })

    // test params undifined
    test("return params undifined", async () => {
        const response = await request(app)
        .delete("/articles/5")
        .set("Authorization", `Bearer ${token}`)

        console.log(response.body.article, "<<<<<<<<<<<<");
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'data not found')
    })

    test("return forbidden", async () => {
        // test login
        const user = { 
            "email": "koko@gmail.com",
            "password": "1234",
        }
        const login = await request(app)
        .post("/login")
        .send(user) 
        console.log(login.body, "<<<<<<<<<<<<<<<<");
        token = login.body.token
        
        const response = await request(app)
        .delete("/articles/2")
        .set("Authorization", `Bearer ${token}`)

        console.log(response.body, "<<<<<<<<<<<<");
        expect(response.status).toBe(403)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'forbidden acces !')
    })
})

// PATCH (khusus patch/req.file)
const path = require('path')
const fs = require('fs')
const filePath = path.resolve(__dirname, "./img-test/test.png");
const imageBuffer = fs.readFileSync(filePath); // Buffer

describe("Patch /articles/:id", () => {
    test("return Image on article success to update", async () => {
        // test login
        const user = { 
            "email": "udinpetod@gmail.com",
            "password": "1234",
        }
        const login = await request(app).post("/login").send(user) // panggil endpoint  
        // console.log(login.body);
        token = login.body.token

        const response = await request(app)
        .patch("/articles/3")
        .set("Authorization", `Bearer ${token}`)
        .attach("imgUrl", imageBuffer, "test.png"); // khusus "req.file"

        console.log(response.body, "<<<<<<<<<<");
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'Image on article siapa success to update')

    })

    test("return not login", async () => {
        const response = await request(app)
        .patch("/articles/3")
        .attach("imgUrl", imageBuffer, "test.png"); // khusus "req.file"

        // console.log(response.body);
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })

    test("return token invalid", async () => {
        let token = "ssdsada"
        const response = await request(app)
        .patch("/articles/3")
        .set("Authorization", `Bearer ${token}`)
        .attach("imgUrl", imageBuffer, "test.png"); // khusus "req.file"

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })

    test("return params undifined", async () => {
        // test login
        const user = { 
            "email": "udinpetod@gmail.com",
            "password": "1234",
        }
        const login = await request(app).post("/login").send(user) // panggil endpoint  
        // console.log(login.body);
        token = login.body.token
        
        const response = await request(app)
        .patch("/articles/5") // salah params
        .set("Authorization", `Bearer ${token}`)
        .attach("imgUrl", imageBuffer, "test.png"); // khusus "req.file"

        // console.log(response.body);
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'data not found')
    })

    test("return forbidden", async () => {
        // test login
        const user = { 
            "email": "koko@gmail.com",
            "password": "1234",
        }
        const login = await request(app)
        .post("/login")
        .send(user) 
        // console.log(login.body, "<<<<<<<<<<<<<<<<");
        token = login.body.token
        
        const response = await request(app)
        .patch("/articles/2")
        .set("Authorization", `Bearer ${token}`)
        .attach("imgUrl", imageBuffer, "test.png"); // khusus "req.file"

        // console.log(response.body, "<<<<<<<<<<<<");
        expect(response.status).toBe(403)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'forbidden acces !')
    })

    test("return validate", async () => {
        // test login
        const user = { 
            "email": "udinpetod@gmail.com",
            "password": "1234",
        }
        const login = await request(app).post("/login").send(user) // panggil endpoint  
        // console.log(login.body, "<<<<<<<<<<<<<");
        token = login.body.token

        const response = await request(app)
        .patch("/articles/1")
        .set("Authorization", `Bearer ${token}`)
        .attach("imgUrl", imageBuffer, ""); // khusus "req.file"
        

        // console.log(response.body, "<<<<<<<<<<<<");
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'img undifined')

    })
})

describe("Get /categories", () => {
    test("return all data categories", async () => {
        const response = await request(app)
        .get("/categories")
        .set("Authorization", `Bearer ${token}`)

        console.log(response.body, "<<<<<<<<<<<");
        expect(response.status).toBe(200)
        expect(response.body.categories[0]).toBeInstanceOf(Object)
        expect(response.body.categories[0]).toHaveProperty("id", expect.any(Number))
        expect(response.body.categories[0]).toHaveProperty("name", expect.any(String))
        expect(response.body.categories[0]).toHaveProperty("createdAt", expect.any(String))
        expect(response.body.categories[0]).toHaveProperty("updatedAt", expect.any(String))
    })

    test("return message not login", async () => {
        const response = await request(app)
        .get("/categories")
        
        // console.log(token, "<<<<<<<<<<<<<<<");
        // console.log(response.body, "<<<<<<<<");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })

    test("return message Invalid Token", async () => {
        const token = "asdasdasda"
        const response = await request(app)
        .get("/categories")
        .set("Authorization", `Bearer ${token}`)
        
        // console.log(token, "<<<<<<<<<<<<<<<");
        // console.log(response.body, "<<<<<<<<");
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'Invalid Token')
    })
})

