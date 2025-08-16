# WTWR Backend

This is the backend for the "What to Wear" (WTWR) application. It provides a RESTful API for user and clothing item management, with a focus on database interaction, security, and validation.

## Features

- **User Management**: CRUD operations for user profiles.

- **Clothing Items**: Create, retrieve, and delete clothing items.

- **Likes**: Add and remove likes on clothing items.

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

**Users**

`GET /users`: Get all users.

GET /users/:userId: Get a user by ID.

`POST /users`: Create a new user.

**Clothing Items**

`GET /items`: Get all clothing items.

`POST /items`: Create a new clothing item.

`DELETE /items/:itemId`: Delete a clothing item.

`PUT /items/:itemId/likes`: Add a like.

`DELETE /items/:itemId/likes`: Remove a like.

## Technologies

- Node.js

- Express.js

- Mongoose

- MongoDB

- Validator

- Nodemon

- ESLint
