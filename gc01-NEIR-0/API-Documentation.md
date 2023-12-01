# Endpoints :
List of available endpoints:
- GET /pub/articles (filter, dst)
- GET /pub/articles/:id
- POST /login
- POST /register
- POST /articles
- GET /articles
- GET /articles/:id
- PUT /articles/:id
- PATCH /articles/:id 
- DELETE /articles/:id
- POST /categories
- GET /categories
- PUT /categories/:id
- DELETE /categories/:id

    
# 1. GET  /pub/articles
Description:
* GET all article for public from database

Response (200 - OK)
```js
{
    "article": [
        {
            "id": 1,
            "title": "banteng masuk partai",
            "content": "pada tanggal 21 okteber banteng telah masuk partai merah hitam",
            "imgUrl": "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRZfrRSy2lXHInGUMwCyUiRNs493rtkXbonj0PFL8DECzPYS_VhzqN1Qt5aq9nqXnjBys9Y__hGI9yY_uM",
            "createdAt": "2023-10-30T20:35:10.648Z",
            "updatedAt": "2023-10-30T20:35:10.648Z",
            "authorId": 1,
            "categoryId": 1,
            "User": {
                "id": 1,
                "email": "admin@gmail.com",
                "role": "admin",
                "phoneNumber": "0889102313",
                "address": "jl. kenangnan bersama dia, gg.3 berharap cuman mimpi no.1",
                "createdAt": "2023-10-30T20:35:10.628Z",
                "updatedAt": "2023-10-30T20:35:10.628Z"
            }
        },
        ...
    ]
}
```


Query:
```js
{
  "filter": "string"
}
```

Response (200 - OK)
```js
{
    "article": [
        {
            "id": 1,
            "title": "banteng masuk partai",
            "content": "pada tanggal 21 okteber banteng telah masuk partai merah hitam",
            "imgUrl": "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRZfrRSy2lXHInGUMwCyUiRNs493rtkXbonj0PFL8DECzPYS_VhzqN1Qt5aq9nqXnjBys9Y__hGI9yY_uM",
            "createdAt": "2023-10-30T20:35:10.648Z",
            "updatedAt": "2023-10-30T20:35:10.648Z",
            "authorId": 1,
            "categoryId": 1,
            "User": {
                "id": 1,
                "email": "admin@gmail.com",
                "role": "admin",
                "phoneNumber": "0889102313",
                "address": "jl. kenangnan bersama dia, gg.3 berharap cuman mimpi no.1",
                "createdAt": "2023-10-30T20:35:10.628Z",
                "updatedAt": "2023-10-30T20:35:10.628Z"
            }
        },
        ....
    ]
}
```

Query:
```js
{
  "sort": "key_name"
}
AND
{
  "directions": "DSC/ASC" // you can use ASC or DSC
}
```

Response (200 - OK)
```js
{
    "article": [
        {
            "id": 16,
            "title": "Unveiling the Mystery",
            "content": "A mystery is about to be unveiled. Get ready for the revelation!",
            "imgUrl": "https://example.com/image15.jpg",
            "createdAt": "2023-11-03T06:27:34.345Z",
            "updatedAt": "2023-11-03T06:27:34.345Z",
            "authorId": 1,
            "categoryId": 1,
            "Category": {
                "id": 1,
                "name": "fashion",
                "createdAt": "2023-11-03T06:27:34.336Z",
                "updatedAt": "2023-11-03T06:27:34.336Z"
            }
        },
        ...
    ]
}
```


```js
{
  "page": "integer"
}
AND
{
  "size": "integer"
}
```

Response (200 - OK)
```js
{
        "article": [
        {
            "id": 1,
            "title": "banteng masuk partai",
            "content": "pada tanggal 21 okteber banteng telah masuk partai merah hitam",
            "imgUrl": "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRZfrRSy2lXHInGUMwCyUiRNs493rtkXbonj0PFL8DECzPYS_VhzqN1Qt5aq9nqXnjBys9Y__hGI9yY_uM",
            "createdAt": "2023-10-30T20:35:10.648Z",
            "updatedAt": "2023-10-30T20:35:10.648Z",
            "authorId": 1,
            "categoryId": 1,
            "User": {
                "id": 1,
                "email": "admin@gmail.com",
                "role": "admin",
                "phoneNumber": "0889102313",
                "address": "jl. kenangnan bersama dia, gg.3 berharap cuman mimpi no.1",
                "createdAt": "2023-10-30T20:35:10.628Z",
                "updatedAt": "2023-10-30T20:35:10.628Z"
            }
        },
        {},
        {},
        {},
        {},
    ]
}
```


```js
{
  "categories": "key_name"
}
```

Response (200 - OK)
```js
{
    "article": [
        {
            "id": 1,
            "title": "banteng masuk partai",
            "content": "pada tanggal 21 okteber banteng telah masuk partai merah hitam",
            "imgUrl": "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRZfrRSy2lXHInGUMwCyUiRNs493rtkXbonj0PFL8DECzPYS_VhzqN1Qt5aq9nqXnjBys9Y__hGI9yY_uM",
            "createdAt": "2023-11-02T03:15:26.536Z",
            "updatedAt": "2023-11-02T03:15:26.536Z",
            "authorId": 1,
            "categoryId": 1,
            "Category": {
                "id": 1,
                "name": "fashion",
                "createdAt": "2023-11-02T03:15:26.490Z",
                "updatedAt": "2023-11-02T03:15:26.490Z"
            }
        },
        {},
    ]
}
```


# 2. GET /articles/:id
Description:
* GET article for public by id from database

Params:
```js
{
  "id": "integer (required)"
}
```

Response (200 - OK)
```js
{
    "article": {
        "id": 1,
        "title": "banteng masuk partai",
        "content": "pada tanggal 21 okteber banteng telah masuk partai merah hitam",
        "imgUrl": "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRZfrRSy2lXHInGUMwCyUiRNs493rtkXbonj0PFL8DECzPYS_VhzqN1Qt5aq9nqXnjBys9Y__hGI9yY_uM",
        "createdAt": "2023-10-30T20:35:10.648Z",
        "updatedAt": "2023-10-30T20:35:10.648Z",
        "authorId": 1,
        "categoryId": 1
    }
}
```

Response (404 - Not Found)
```js
{
    "message": "Data with id: 11 Not found"
}
```


# 3. POST /login
Description:
* POST login

body:
```js
{
    "email": "admin@gmail.com",
    "password": "adminajah"
}
```

Response (200 - OK)
```js
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk4OTkwNTI3fQ.ryI00PW2E_k2IZ8_428YRJdnuDRis91hCD0f-NGtumg",
    "email": "admin@gmail.com",
    "role": "admin"
}
```

Response (400 - Bad Request)
```js
{
    "message": "email invalid"
}
OR
{
    "message": "password invalid"
}
```

Response (401 - Unauthenticated)
```js
{
    "username / password invalid"
}
```


# 4. POST /register
Description:
* POST register

body:
```js
{
    "email": "budi@yahoo.so", 
    "password": "123", 
    "phoneNumber": "090992134", 
    "address": "jl. udahan vanh"
}
```

Response (200 - OK)
```js
{
    "id": 6,
    "email": "budi@yahoo.so",
    "phoneNumber": "090992134",
    "address": "jl. udahan vanh"
}
```

Response (400 - Bad Request)
```js
{
    "message": "email can't empty"
}
OR
{
    "message": "password can't empty"
}
```

Response (404 - not found)
```js
{
    "message": "data not found"
}
```

Response (403 - forbidden)
```js
{
    "message": "forbidden acces !"
}
```

Response (401 - InvalidToken)
```js
{
    "message": "Invalid Token"
}
OR
{
    "message": "JsonWebTokenError"
}
```

# 5. POST /articles
Description:
* POST article to database

body:
```js
{
  "title": "string", 
  "content": "string", 
  "imgUrl": "string", 
  "authorId": "integer", 
  "categoryId": "integer"
}
```

Response (201 - Created)
```js
{
    "article": {
        "id": 6,
        "title": "manusia salmon",
        "content": "telah di temukan manusia setengah salmaon dalam buku radity dika?!",
        "imgUrl": "on procces",
        "authorId": 1,
        "categoryId": 2,
        "updatedAt": "2023-10-30T21:03:56.703Z",
        "createdAt": "2023-10-30T21:03:56.703Z"
    }
}
```

Response (400 - Bad Request)
```js
{
    "message": "title can't empty"
}
OR
{
    "message": "content can't empty"
}
```

Response (403 - forbidden)
```js
{
    "message": "forbidden acces !"
}
```

Response (401 - InvalidToken)
```js
{
    "message": "Invalid Token"
}
OR
{
    "message": "JsonWebTokenError"
}
```

# 6. GET /articles
Description:
* GET all article from database

Response (200 - OK)
```js
{
    "article": [
        {
            "id": 1,
            "title": "banteng masuk partai",
            "content": "pada tanggal 21 okteber banteng telah masuk partai merah hitam",
            "imgUrl": "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRZfrRSy2lXHInGUMwCyUiRNs493rtkXbonj0PFL8DECzPYS_VhzqN1Qt5aq9nqXnjBys9Y__hGI9yY_uM",
            "createdAt": "2023-10-30T20:35:10.648Z",
            "updatedAt": "2023-10-30T20:35:10.648Z",
            "authorId": 1,
            "categoryId": 1,
            "User": {
                "id": 1,
                "email": "admin@gmail.com",
                "role": "admin",
                "phoneNumber": "0889102313",
                "address": "jl. kenangnan bersama dia, gg.3 berharap cuman mimpi no.1",
                "createdAt": "2023-10-30T20:35:10.628Z",
                "updatedAt": "2023-10-30T20:35:10.628Z"
            }
        },
        ...
    ]
}
```

Response (401 - InvalidToken)
```js
{
    "message": "Invalid Token"
}
OR
{
    "message": "JsonWebTokenError"
}
```

# 7. GET /articles/:id
Description:
* GET article by id from database

Params:
```js
{
  "id": "integer (required)"
}
```

Response (200 - OK)
```js
{
    "article": {
        "id": 1,
        "title": "banteng masuk partai",
        "content": "pada tanggal 21 okteber banteng telah masuk partai merah hitam",
        "imgUrl": "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRZfrRSy2lXHInGUMwCyUiRNs493rtkXbonj0PFL8DECzPYS_VhzqN1Qt5aq9nqXnjBys9Y__hGI9yY_uM",
        "createdAt": "2023-10-30T20:35:10.648Z",
        "updatedAt": "2023-10-30T20:35:10.648Z",
        "authorId": 1,
        "categoryId": 1
    }
}
```

Response (404 - Not Found)
```js
{
    "message": "Data with id: 11 Not found"
}
```

Response (401 - InvalidToken)
```js
{
    "message": "Invalid Token"
}
OR
{
    "message": "JsonWebTokenError"
}
```


# 8. PUT /articles/:id
Description:
* PUT article by id to database

Params:
```js
{
  "id": "integer (required)"
}
```

body:
```js
{
  "title": "string", 
  "content": "string", 
  "imgUrl": "string", 
  "authorId": "integer", 
  "categoryId": "integer"
}
```

Response (200 - OK)
```js
{
    "id": "6",
    "title": "marmut merah jambu",
    "content": "raditya dika telah meluncurkan buku baru berjudul marmut merah jambu",
    "imgUrl": "still crafting",
    "authorId": 1,
    "categoryId": 2
}
```

Response (404 - Not Found)
```js
{
    "message": "Data with id: 11 Not found"
}
```

Response (400 - Bad Request)
```js
{
    "message": "title can't empty"
}
OR
{
    "message": "content can't empty"
}
```

Response (403 - forbidden)
```js
{
    "message": "forbidden acces !"
}
```

Response (401 - InvalidToken)
```js
{
    "message": "Invalid Token"
}
OR
{
    "message": "JsonWebTokenError"
}
```

# 9. DELETE /articles/:id
Description:
* DELETE article by id from database

Params:
```js
{
  "id": "integer (required)"
}
```

Response (200 - OK)
```js
{
    "message": "marmut merah jambu success to delete"
}
```

Response (404 - Not Found)
```js
{
    "message": "Data with id: 11 Not found"
}
```

Response (403 - forbidden)
```js
{
    "message": "forbidden acces !"
}
```

Response (401 - InvalidToken)
```js
{
    "message": "Invalid Token"
}
OR
{
    "message": "JsonWebTokenError"
}
```

# 10. POST /categories
Description:
* POST category to database

body:
```js
{
  "name": "string"
}
```

Response (201 - Created)
```js
{
    "categories": {
        "id": 6,
        "name": "food",
        "updatedAt": "2023-10-30T21:23:06.306Z",
        "createdAt": "2023-10-30T21:23:06.306Z"
    }
}
```

Response (400 - Bad Request)
```js
{
    "message": "name can't empty"
}
```

Response (403 - forbidden)
```js
{
    "message": "forbidden acces !"
}
```

Response (401 - InvalidToken)
```js
{
    "message": "Invalid Token"
}
OR
{
    "message": "JsonWebTokenError"
}
```

# 11. GET /categories
Description:
* GET all category from database

Response (200 - OK)
```js
{
    "categories": [
        {
            "id": 1,
            "name": "fashion",
            "createdAt": "2023-10-30T20:35:10.640Z",
            "updatedAt": "2023-10-30T20:35:10.640Z"
        },
        ...
    ]
}
```

Response (401 - InvalidToken)
```js
{
    "message": "Invalid Token"
}
OR
{
    "message": "JsonWebTokenError"
}
```

# 12. PUT /categories/:id
Description:
* PUT category by id to database

Params:
```js
{
  "id": "integer (required)"
}
```

body:
```js
{
  "name": "string"
}
```

Response (200 - OK)
```js
{
    "id": "1",
    "name": "vlogging"
}
```

Response (404 - Not Found)
```js
{
    "message": "Data with id: 8 Not found"
}
```

Response (400 - Bad Request)
```js
{
    "message": "name can't empty"
}
```

Response (403 - forbidden)
```js
{
    "message": "forbidden acces !"
}
```

Response (401 - InvalidToken)
```js
{
    "message": "Invalid Token"
}
OR
{
    "message": "JsonWebTokenError"
}
```

# 13. DELETE /categories/:id
Description:
* DELETE category by id from database

Params:
```js
{
  "id": "integer (required)"
}
```

Response (200 - OK)
```js
{
    "message": "sport success to delete"
}
```

Response (403 - forbidden)
```js
{
    "message": "forbidden acces !"
}
```

Response (401 - InvalidToken)
```js
{
    "message": "Invalid Token"
}
OR
{
    "message": "JsonWebTokenError"
}
```

Response (404 - Not Found)
```js
{
    "message": "Data with id: 11 Not found"
}
```

# 14. patch /articles/:id
Description:
* patch imgurl to article database by id

Params:
```js
{
  "id": "integer (required)"
}
```

body:
```js
{
  "imgUrl": "string", 
}
```

Response (200 - OK)
```js
{
    message: `Image on article Marmut merah jambu success to update`
}
```

Response (404 - Not Found)
```js
{
    "message": "Data with id: 11 Not found"
}
```

Response (400 - Bad Request)
```js
{
    "message": "img undifined"
}
```

Response (403 - forbidden)
```js
{
    "message": "forbidden acces !"
}
```

Response (401 - InvalidToken)
```js
{
    "message": "Invalid Token"
}
OR
{
    "message": "JsonWebTokenError"
}
```

# Global Error
Response (500 - Internal Server Error)
```js
{
    message: "Interval Server Error"
}
```