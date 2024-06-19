# API REST + JWT

API REST of user login/sign-up, logout and view/add a list of books with with Node.js, Express using jwt(jsonwebtoken) authentication

2 Servers:
- `auth.js` Authentication server
- `books.js` Authorization server

## Libraries

- Express
- Dotenv
- Jsonwebtoken

## Installation

Install dependencies
```javascript
npm i 
```

Start Authentication server in localhost:3000
```javascript
node auth.js
```

Start Authorization server in localhost:4000
```javascript
node books.js
```

## Endpoints
### Authentication
- [GET] http://localhost:3000/login Login user with role "member". Returns JWT of the **member** user

```json
{
    "username": "anna",
    "password": "password123member",
    "role": "member"
}
```
Payload. Example JWT returned
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFubmEiLCJyb2xlIjoibWVtYmVyIiwiaWF0IjoxNjk5OTU2ODMyLCJleHAiOjE2OTk5NTgwMzJ9.CpnJGtPa5h6gjKjlHtcC4aFtdhf8e8bvFK_eXE5DZEE",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFubmEiLCJyb2xlIjoibWVtYmVyIiwiaWF0IjoxNjk5OTU2ODMyfQ.-kqIPrlRiGSLjNGJkkEnBEAFQou1jRgTiyRS6uIPmJc"
  }
```
- [POST] http://localhost:3000/login  Login user with role "admin". Returns JWT of the **admin** user

Body:
```json
{
    "username": "john",
    "password": "password123admin",
    "role": "admin"
}
```
Payload. Example JWT returned
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTk5NTc2NjMsImV4cCI6MTY5OTk1ODg2M30.WDrRbWRXmDuIcAmghoW9-zJYW-tHUZX5HG2jKvBHalQ",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTk5NTc2NjN9._TLSw_q5dMomp2R0RwqKlanLmaAGEaygVfPm3NWnvrA"
  }
```
### Authorization - books server
- [GET] http://localhost:4000/books Get all books if we pass a valid JWT with role **member/admin** in HTTP `authorization` header. HTTP Header: 

**HTTP header**: authorization 

**Value**: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFubmEiLCJyb2xlIjoibWVtYmVyIiwiaWF0IjoxNjk5OTU2ODMyLCJleHAiOjE2OTk5NTgwMzJ9.CpnJGtPa5h6gjKjlHtcC4aFtdhf8e8bvFK_eXE5DZEE


- [POST] http://localhost:4000/books  Create a new book if we pass a valid JWT with role **admin** in HTTP `authorization` header. HTTP header

**HTTP header**: authorization 

**Value**: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFubmEiLCJyb2xlIjoibWVtYmVyIiwiaWF0IjoxNjk5OTU2ODMyLCJleHAiOjE2OTk5NTgwMzJ9.CpnJGtPa5h6gjKjlHtcC4aFtdhf8e8bvFK_eXE5DZEE


Body:
```json
{
    "author": "Cervantes",
    "country": "Spain",
    "language": "Spanish",
    "pages": 700,
    "title": "Don Quijote de la Mancha",
    "year": 1605
}
```


