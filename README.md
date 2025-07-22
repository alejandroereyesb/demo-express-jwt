# API REST + JWT

API REST of user login/sign-up, logout, and view/add a list of books using Node.js, Express, and JWT (jsonwebtoken) authentication.

## Project Structure

```
/demo-express-jwt
├── controllers/        # Contains the business logic for authentication and books
│   ├── authController.js
│   ├── bookController.js
├── middlewares/        # Contains reusable middleware functions
│   ├── authMiddleware.js
├── routes/             # Defines the routes for authentication and books
│   ├── authRoutes.js
│   ├── bookRoutes.js
├── auth.js             # Entry point for the authentication server
├── books.js            # Entry point for the books server
├── .env                # Environment variables (e.g., secrets)
├── package.json        # Project dependencies and scripts
├── .gitignore          # Ignored files for Git
```

## Libraries

- **Express**: Web framework for Node.js.
- **Jsonwebtoken**: For generating and verifying JWTs.
- **body-parser**: Middleware to parse incoming request bodies.

## Installation

Install dependencies:
```bash
npm i
```

Start the Authentication server on `localhost:3000`:
```bash
node auth.js
```

Start the Authorization server on `localhost:4000`:
```bash
node books.js
```

## Endpoints

### Authentication Server (`auth.js`)

#### [POST] `http://localhost:3000/login`
**Description**: Login a user and return an access token and refresh token.

**Request Body**:
```json
{
    "username": "anna",
    "password": "password123member"
}
```

**Response**:
- **200 OK**:
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
- **401 Unauthorized**:
```json
{
    "message": "Invalid username or password"
}
```

---

#### [POST] `http://localhost:3000/token`
**Description**: Generate a new access token using a refresh token.

**Request Body**:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response**:
- **200 OK**:
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
- **400 Bad Request**:
```json
{
    "message": "Refresh token is required"
}
```
- **403 Forbidden**:
```json
{
    "message": "Invalid refresh token"
}
```

---

#### [POST] `http://localhost:3000/logout`
**Description**: Logout a user by invalidating their refresh token.

**Request Body**:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response**:
- **200 OK**:
```json
{
    "message": "Logout successful"
}
```
- **400 Bad Request**:
```json
{
    "message": "Refresh token is required"
}
```

---

### Authorization Server (`books.js`)

#### [GET] `http://localhost:4000/books`
**Description**: Retrieve a list of books. Requires a valid JWT.

**Headers**:
```json
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response**:
- **200 OK**:
```json
[
    {
        "author": "Chinua Achebe",
        "country": "Nigeria",
        "language": "English",
        "pages": 209,
        "title": "Things Fall Apart",
        "year": 1958
    },
    {
        "author": "Hans Christian Andersen",
        "country": "Denmark",
        "language": "Danish",
        "pages": 784,
        "title": "Fairy tales",
        "year": 1836
    }
]
```
- **401 Unauthorized**:
```json
{
    "message": "Unauthorized"
}
```
- **403 Forbidden**:
```json
{
    "message": "Forbidden"
}
```

---

#### [POST] `http://localhost:4000/books`
**Description**: Add a new book. Requires a valid JWT with admin role.

**Headers**:
```json
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Request Body**:
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

**Response**:
- **201 Created**:
```json
{
    "message": "Book added successfully",
    "book": {
        "author": "Cervantes",
        "country": "Spain",
        "language": "Spanish",
        "pages": 700,
        "title": "Don Quijote de la Mancha",
        "year": 1605
    }
}
```
- **400 Bad Request**:
```json
{
    "message": "All fields (author, country, language, pages, title, year) are required"
}
```
- **403 Forbidden**:
```json
{
    "message": "Forbidden: Admins only"
}
```

---

## Environment Variables

The project uses the following environment variables stored in a `.env` file:
```plaintext
ACCESS_TOKEN_SECRET=somerandomaccesstoken
REFRESH_TOKEN_SECRET=somerandomstringforrefreshtoken
```

Make sure to create a `.env` file in the root directory with these variables before starting the servers.


