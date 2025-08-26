# WTWR Backend

This is the backend for the "What to Wear" (WTWR) application. It provides a RESTful API for user and clothing item management, with a focus on database interaction, security, and validation.

## Features

- **User Management**: CRUD operations for user profiles.

- **Clothing Items**: Create, retrieve, and delete clothing items.

- **Likes**: Add and remove likes on clothing items.

- **Authentication & Authorization**: JWT-based authentication with bcrypt password hashing.

- **MongoDB**: Data storage using Mongoose.

- **Validation**: Input validation for data integrity.

## Getting Started

Clone the project

```bash
git clone https://github.com/eduenez33/se_project_express.git

cd se_project_express
```

Install dependencies

```bash
  npm install
```

Start the server

- Development: `npm run dev`
- Production: `npm run start`

## API Endpoints

**Authentication**

`POST /signup`: Create a new user account.

`POST /signin`: User login.

**Users**

`GET /users/me`: Get current user profile (requires authentication).

`PATCH /users/me`: Update current user profile (requires authentication).

**Clothing Items**

`GET /items`: Get all clothing items.

`POST /items`: Create a new clothing item (requires authentication).

`DELETE /items/:itemId`: Delete a clothing item (requires authentication).

`PUT /items/:itemId/likes`: Add a like to a clothing item (requires authentication).

`DELETE /items/:itemId/likes`: Remove a like from a clothing item (requires authentication).

## Authorization

This application uses **JWT (JSON Web Tokens)** for authentication and authorization.

### Authentication Flow

1. **User Registration** (`POST /signup`):

   - Users provide name, avatar, email, and password
   - Passwords are hashed using bcrypt with a salt rounds of 10
   - User account is created (password is not returned in response)

2. **User Login** (`POST /signin`):

   - Users provide email and password
   - Credentials are verified against the database
   - Upon successful authentication, a JWT token is issued with 7-day expiration
   - Token contains the user's ID as payload

3. **Protected Routes**:
   - Routes marked "requires authentication" need a valid JWT token
   - Token must be sent in the `Authorization` header as `Bearer <token>`
   - Middleware validates the token and extracts user information
   - User ID is made available in `req.user._id` for protected route handlers

### Security Features

- **Password Hashing**: All passwords are hashed using bcrypt before storage
- **JWT Expiration**: Tokens automatically expire after 7 days
- **Email Uniqueness**: Duplicate email addresses are prevented
- **Input Validation**: Required fields are validated on all endpoints

## Technologies

- Node.js

- Express.js

- Mongoose

- MongoDB

- Validator

- Nodemon

- ESLint
