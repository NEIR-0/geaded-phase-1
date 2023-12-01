const request = require("supertest") // panggil supertest
const app = require("../app") // panggil app
const {User} = require("../models/index") // panggil User models
const {hashing} = require("../Helper/bcryptjs")
/*
terminal keyword:
1. --detectOpenHandles
*/

/*
structure test:
1. response.status => tobe (200/400/401/403/404/500)
2. response.status => toBeInstanceOf (Object/Array)
3. response.status => toHaveProperty ("'message', 'error'"/"'email', 'udin@gmial.com", dst)
*/


// pake beforeAll ama afterAll
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
});

afterAll(async  () => {
    await User.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
});


let token;
describe('Post /login', () => { // async
    // test kalo bener
    test('should return token, email, role', async () => { // async
        const user = {
            "email": "udinpetod@gmail.com",
            "password": "1234",
        }
    
        const response = await request(app).post("/login").send(user) // panggil endpoint  
        // console.log(response.body, "<<<<<<<<<<<<<"); // cek error "response.body"

        expect(response.status).toBe(200); // 1. response.status => tobe
        expect(response.body).toBeInstanceOf(Object); // 2. response.status => toBeInstanceOf
        expect(response.body).toHaveProperty("token",expect.any(String)); // 3. response.status => toHaveProperty
        expect(response.body).toHaveProperty("email",expect.any(String));
        expect(response.body).toHaveProperty("role",expect.any(String));

        // console.log(response.body);
        token = response.body.token
    });

    // test validate
    test('should return email undifined', async () => { // async
        const invalidUser = {
            "email": "",
            "password": "1234",
        }
        const response = await request(app).post("/login").send(invalidUser)
        // console.log(response.body);
        expect(response.status).toBe(400); 
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", `email invalid`);
    });

    test('should return password undifined', async () => { // async
        const invalidUser = {
            "email": "udinpetod@gmail.com",
            "password": "",
        }
        const response = await request(app).post("/login").send(invalidUser)
        console.log(response.body);
        expect(response.status).toBe(400); // 400 - bad request
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", `password invalid`);
    });

    test('should invalid email', async () => { // async
        const invalidUser = {
            "email": "udinslebew@gmail.com", // wrong email
            "password": "1234",
        }
        const response = await request(app).post("/login").send(invalidUser)
        // console.log(response.body);
        expect(response.status).toBe(401); // 401 - Unauthorized
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "username / password invalid");
    });

    test('should invalid password', async () => { // async
        const invalidUser = {
            "email": "udinpetod@gmail.com", // wrong email
            "password": "4321",
        }
        const response = await request(app).post("/login").send(invalidUser)
        console.log(response.body);
        expect(response.status).toBe(401); // 401 - Unauthorized
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "username / password invalid");
    });
});


describe('Post /register', () => { // async
    // test kalo bener
    test('should return email, phoneNumber, address', async () => { // async
        const user = {
            "email": "bangtoyid@gmail.com", 
            "password": "123456", 
            "phoneNumber": "9091029321", 
            "address": "jl.gitu ajah"
        }
        
        // console.log(token, "<<<<<<<<<<<<<<<<<<<<<<<<");
        const response = await request(app)
        .post("/register")
        .set("Authorization", `Bearer ${token}`) // masukkin token di set sebelum routes
        .send(user) // panggil endpoint  
        console.log(response.body, "<<<<<<<<<<<<<"); // cek error

        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object); // 2. 
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("email", expect.any(String));
        expect(response.body).toHaveProperty("phoneNumber", expect.any(String));
        expect(response.body).toHaveProperty("address", expect.any(String));
    });

    test("should return email null", async () => {
        const user = {
            // "email": "", 
            "password": "123456", 
            "phoneNumber": "9091029321", 
            "address": "jl.gitu ajah"
        }

        const response = await request(app)
        .post("/register")
        .set("Authorization", `Bearer ${token}`)
        .send(user)

        expect(response.status).toBe(400)
        // console.log(response.body, "<<<<<<<<<<<");
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "email can't null")
    })

    test("should return password null", async () => {
        const user = {
            "email": "udinlol@gmail.com", 
            // "password": "123456", 
            "phoneNumber": "9091029321", 
            "address": "jl.gitu ajah"
        }

        const response = await request(app)
        .post("/register")
        .set("Authorization", `Bearer ${token}`)
        .send(user)

        expect(response.status).toBe(400)
        // console.log(response.body, "<<<<<<<<<<<");
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "password can't null")
    })
    
    test("should return email empty", async () => {
        const user = {
            "email": "", 
            "password": "123456", 
            "phoneNumber": "9091029321", 
            "address": "jl.gitu ajah"
        }

        const response = await request(app)
        .post("/register")
        .set("Authorization", `Bearer ${token}`)
        .send(user)

        expect(response.status).toBe(400)
        // console.log(response.body, "<<<<<<<<<<<");
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "email can't empty")
    })

    test("should return password empty", async () => {
        const user = {
            "email": "udinkoko@gmail.com", 
            "password": "", 
            "phoneNumber": "9091029321", 
            "address": "jl.gitu ajah"
        }

        const response = await request(app)
        .post("/register")
        .set("Authorization", `Bearer ${token}`)
        .send(user)

        expect(response.status).toBe(400)
        // console.log(response.body, "<<<<<<<<<<<");
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "password can't empty")
    })

    test("should return email must be unique", async () => {
        const user = {
            "email": "koko@gmail.com", 
            "password": "1234", 
            "phoneNumber": "9091029321", 
            "address": "jl.gitu ajah"
        }

        const response = await request(app)
        .post("/register")
        .set("Authorization", `Bearer ${token}`)
        .send(user)

        // console.log(response.body, "<<<<<<<<<<<");
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "email must be unique")
    })

    test("should return must be email", async () => {
        const user = {
            "email": "koko", 
            "password": "1234", 
            "phoneNumber": "9091029321", 
            "address": "jl.gitu ajah"
        }

        const response = await request(app)
        .post("/register")
        .set("Authorization", `Bearer ${token}`)
        .send(user)

        // console.log(response.body, "<<<<<<<<<<<");
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "must be email")
    })

    test("should return invalid token", async () => {
        const user = {
            "email": "kokoasd@emakl.com", 
            "password": "1234", 
            "phoneNumber": "9091029321", 
            "address": "jl.gitu ajah"
        }

        const response = await request(app)
        .post("/register")
        // .set("Authorization", `Bearer ${token}`) // token gak ada
        .send(user)

        // console.log(response.body, "<<<<<<<<<<<");
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    test("should return invalid token random string", async () => {
        const user = {
            "email": "kokoasd@emakl.com", 
            "password": "1234", 
            "phoneNumber": "9091029321", 
            "address": "jl.gitu ajah"
        }

        const response = await request(app)
        .post("/register")
        .set("Authorization", `Bearer asasdasdasdasd`) // token random
        .send(user)

        // console.log(response.body, "<<<<<<<<<<<");
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })
});
