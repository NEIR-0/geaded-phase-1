const request = require("supertest") // panggil supertest
const app = require("../app") // panggil app
const {User, Article, Category} = require("../models/index") // panggil User models
const {hashing} = require("../Helper/bcryptjs")

beforeAll(async () => {
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
            "title": "banteng masuk partai",
            "content": "pada tanggal 21 okteber banteng telah masuk partai merah hitam",
            "imgUrl": "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRZfrRSy2lXHInGUMwCyUiRNs493rtkXbonj0PFL8DECzPYS_VhzqN1Qt5aq9nqXnjBys9Y__hGI9yY_uM",
            "createdAt" : "2023-10-30T09:03:17.903Z",
            "updatedAt": "2023-10-30T09:03:17.903Z",
            "categoryId": 1,
            "authorId": 1
        },
        {
            "title": "Exciting News!",
            "content": "Something amazing happened today. Stay tuned for more details!",
            "imgUrl": "https://example.com/image1.jpg",
            "createdAt": "2023-11-02T10:00:00.000Z",
            "updatedAt": "2023-11-02T10:00:00.000Z",
            "categoryId": 1,
            "authorId": 1
        },
        {
            "title": "Breaking News",
            "content": "Incredible developments are underway. Keep an eye on this space for updates!",
            "imgUrl": "https://example.com/image2.jpg",
            "createdAt": "2023-11-02T11:00:00.000Z",
            "updatedAt": "2023-11-02T11:00:00.000Z",
            "categoryId": 1,
            "authorId": 1
        },
        {
            "title": "A Day to Remember",
            "content": "Memories were made today that will last a lifetime. More on this soon.",
            "imgUrl": "https://example.com/image3.jpg",
            "createdAt": "2023-11-02T12:00:00.000Z",
            "updatedAt": "2023-11-02T12:00:00.000Z",
            "categoryId": 1,
            "authorId": 1
        },
        {
            "title": "Latest Updates",
            "content": "Find out what's new in the world. Stay with us for the latest information.",
            "imgUrl": "https://example.com/image4.jpg",
            "createdAt": "2023-11-02T13:00:00.000Z",
            "updatedAt": "2023-11-02T13:00:00.000Z",
            "categoryId": 1,
            "authorId": 1
        },
        {
            "title": "Unbelievable Stories",
            "content": "Stories that will leave you amazed. Read more to be astonished!",
            "imgUrl": "https://example.com/image5.jpg",
            "createdAt": "2023-11-02T14:00:00.000Z",
            "updatedAt": "2023-11-02T14:00:00.000Z",
            "categoryId": 1,
            "authorId": 1
        },
        {
            "title": "Exclusive Announcement",
            "content": "An exclusive announcement is coming your way. Stay tuned!",
            "imgUrl": "https://example.com/image6.jpg",
            "createdAt": "2023-11-02T15:00:00.000Z",
            "updatedAt": "2023-11-02T15:00:00.000Z",
            "categoryId": 1,
            "authorId": 1
        },
        {
            "title": "Incredible Discoveries",
            "content": "Discoveries that will change the world. Learn more about them here.",
            "imgUrl": "https://example.com/image7.jpg",
            "createdAt": "2023-11-02T16:00:00.000Z",
            "updatedAt": "2023-11-02T16:00:00.000Z",
            "categoryId": 1,
            "authorId": 1
        },
        {
            "title": "Amazing Achievements",
            "content": "Remarkable achievements were unlocked today. Explore them with us!",
            "imgUrl": "https://example.com/image8.jpg",
            "createdAt": "2023-11-02T17:00:00.000Z",
            "updatedAt": "2023-11-02T17:00:00.000Z",
            "categoryId": 1,
            "authorId": 1
        },
        {
            "title": "A Journey Begins",
            "content": "The journey of a lifetime starts now. Join us on this adventure!",
            "imgUrl": "https://example.com/image9.jpg",
            "createdAt": "2023-11-02T18:00:00.000Z",
            "updatedAt": "2023-11-02T18:00:00.000Z",
            "categoryId": 1,
            "authorId": 1
        },
        {
            "title": "Stay Informed",
            "content": "Get all the information you need to stay updated. Don't miss out!",
            "imgUrl": "https://example.com/image10.jpg",
            "createdAt": "2023-11-02T19:00:00.000Z",
            "updatedAt": "2023-11-02T19:00:00.000Z",
            "categoryId": 1,
            "authorId": 1
        },
        {
            "title": "Surprising Developments",
            "content": "Developments that will leave you surprised. Stay connected for more.",
            "imgUrl": "https://example.com/image11.jpg",
            "createdAt": "2023-11-02T20:00:00.000Z",
            "updatedAt": "2023-11-02T20:00:00.000Z",
            "categoryId": 1,
            "authorId": 1
        },
        {
            "title": "A World of Possibilities",
            "content": "The world is full of possibilities. Explore them with us!",
            "imgUrl": "https://example.com/image12.jpg",
            "createdAt": "2023-11-02T21:00:00.000Z",
            "updatedAt": "2023-11-02T21:00:00.000Z",
            "categoryId": 1,
            "authorId": 1
        },
        {
            "title": "Discover the Unknown",
            "content": "Discover the unknown with us. It's going to be an incredible journey.",
            "imgUrl": "https://example.com/image13.jpg",
            "createdAt": "2023-11-02T22:00:00.000Z",
            "updatedAt": "2023-11-02T22:00:00.000Z",
            "categoryId": 1,
            "authorId": 1
        },
        {
            "title": "Exciting Times Ahead",
            "content": "Exciting times are on the horizon. Stay with us for the latest updates.",
            "imgUrl": "https://example.com/image14.jpg",
            "createdAt": "2023-11-02T23:00:00.000Z",
            "updatedAt": "2023-11-02T23:00:00.000Z",
            "categoryId": 1,
            "authorId": 1
        },
        {
            "title": "Unveiling the Mystery",
            "content": "A mystery is about to be unveiled. Get ready for the revelation!",
            "imgUrl": "https://example.com/image15.jpg",
            "createdAt": "2023-11-03T00:00:00.000Z",
            "updatedAt": "2023-11-03T00:00:00.000Z",
            "categoryId": 1,
            "authorId": 1
        },
        {
            "title": "The Adventure Begins",
            "content": "An exciting adventure begins now. Join us for the journey of a lifetime!",
            "imgUrl": "https://example.com/image16.jpg",
            "createdAt": "2023-11-03T01:00:00.000Z",
            "updatedAt": "2023-11-03T01:00:00.000Z",
            "categoryId": 1,
            "authorId": 1
        },
        {
            "title": "Breaking Barriers",
            "content": "We are breaking barriers and pushing boundaries. Stay connected!",
            "imgUrl": "https://example.com/image17.jpg",
            "createdAt": "2023-11-03T02:00:00.000Z",
            "updatedAt": "2023-11-03T02:00:00.000Z",
            "categoryId": 1,
            "authorId": 1
        },
        {
            "title": "Explore the Possibilities",
            "content": "There are endless possibilities to explore. Join us on this journey!",
            "imgUrl": "https://example.com/image18.jpg",
            "createdAt": "2023-11-03T03:00:00.000Z",
            "updatedAt": "2023-11-03T03:00:00.000Z",
            "categoryId": 1,
            "authorId": 1
        },
        {
            "title": "Unlocking the Secrets",
            "content": "We are on the path to unlocking some incredible secrets. Don't miss out!",
            "imgUrl": "https://example.com/image19.jpg",
            "createdAt": "2023-11-03T04:00:00.000Z",
            "updatedAt": "2023-11-03T04:00:00.000Z",
            "categoryId": 1,
            "authorId": 1
        }
    ])
})

afterAll(async  () => {
    // Article
    await Article.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
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
});

describe("Get /pub/articles", () => {
    test("return all data", async () => {
        const response = await request(app)
        .get("/pub/articles")
        
        console.log(response.body);
        expect(response.status).toBe(200)
        expect(response.body.article[0]).toBeInstanceOf(Object)

        expect(response.body.article[0]).toHaveProperty("id", expect.any(Number))
        expect(response.body.article[0]).toHaveProperty("title", expect.any(String))
        expect(response.body.article[0]).toHaveProperty("content", expect.any(String))
        expect(response.body.article[0]).toHaveProperty("imgUrl", expect.any(String))
        expect(response.body.article[0]).toHaveProperty("createdAt", expect.any(String))
        expect(response.body.article[0]).toHaveProperty("updatedAt", expect.any(String))
        expect(response.body.article[0]).toHaveProperty("authorId", expect.any(Number))
        expect(response.body.article[0]).toHaveProperty("categoryId", expect.any(Number))

    })

    test("return all data by filter", async () => {
        const response = await request(app)
        .get("/pub/articles?filter=banteng")

        console.log(response.body);
        expect(response.status).toBe(200)
        expect(response.body.article[0]).toBeInstanceOf(Object)

        expect(response.body.article[0]).toHaveProperty("id", expect.any(Number))
        expect(response.body.article[0]).toHaveProperty("title", expect.any(String))
        expect(response.body.article[0]).toHaveProperty("content", expect.any(String))
        expect(response.body.article[0]).toHaveProperty("imgUrl", expect.any(String))
        expect(response.body.article[0]).toHaveProperty("createdAt", expect.any(String))
        expect(response.body.article[0]).toHaveProperty("updatedAt", expect.any(String))
        expect(response.body.article[0]).toHaveProperty("authorId", expect.any(Number))
        expect(response.body.article[0]).toHaveProperty("categoryId", expect.any(Number))
    })

    test("return count perpage with size", async () => {
        const response = await request(app)
        .get("/pub/articles?page=1&size=5")

        console.log(response.body);
        expect(response.status).toBe(200)
        expect(response.body.article[0]).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("count", expect.any(Number))

        expect(response.body.article[0]).toHaveProperty("id", expect.any(Number))
        expect(response.body.article[0]).toHaveProperty("title", expect.any(String))
        expect(response.body.article[0]).toHaveProperty("content", expect.any(String))
        expect(response.body.article[0]).toHaveProperty("imgUrl", expect.any(String))
        expect(response.body.article[0]).toHaveProperty("createdAt", expect.any(String))
        expect(response.body.article[0]).toHaveProperty("updatedAt", expect.any(String))
        expect(response.body.article[0]).toHaveProperty("authorId", expect.any(Number))
        expect(response.body.article[0]).toHaveProperty("categoryId", expect.any(Number))
    })
})

describe("Get /pub/articles/:id", () => {
    test("return data by id", async () => {
        const response = await request(app)
        .get("/pub/articles/1")

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body.article).toHaveProperty("id", expect.any(Number))
        expect(response.body.article).toHaveProperty("title", expect.any(String))
        expect(response.body.article).toHaveProperty("content", expect.any(String))
        expect(response.body.article).toHaveProperty("imgUrl", expect.any(String))
        expect(response.body.article).toHaveProperty("createdAt", expect.any(String))
        expect(response.body.article).toHaveProperty("updatedAt", expect.any(String))
        expect(response.body.article).toHaveProperty("authorId", expect.any(Number))
        expect(response.body.article).toHaveProperty("categoryId", expect.any(Number))
    })

    test("return invalid id", async () => {
        const response = await request(app)
        .get("/pub/articles/21")

        console.log(response.body);
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", 'data not found')
    })
})