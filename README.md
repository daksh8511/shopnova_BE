# ShopNova Backend

The ShopNova backend is a Node.js and Express API for the marketplace frontend. It handles user authentication, address management, and shopping cart operations with MongoDB as the database.

## Features

- User signup and login
- User existence checks
- Customer address updates
- Add, view, update, and remove cart products
- MongoDB persistence through Mongoose
- CORS support for local development and the deployed frontend
- JSON Web Token and bcrypt-based authentication dependencies

## Tech Stack

- Node.js
- Express 5
- MongoDB with Mongoose
- JSON Web Token
- bcryptjs
- dotenv
- Multer

## Getting Started

From the `backend` directory:

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URI=mongodb://127.0.0.1:27017/shopnova
PORT=5001
```

Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:5001` unless a different `PORT` is configured.

## Available Scripts

| Command       | Description                   |
| ------------- | ----------------------------- |
| `npm run dev` | Start the server with Nodemon |
| `npm start`   | Start the server with Node.js |

## API Routes

### Health Check

`GET /`

Returns a basic server response.

### Authentication

| Method | Endpoint                    | Description                 |
| ------ | --------------------------- | --------------------------- |
| `POST` | `/api/auth/signup`          | Create a user account       |
| `POST` | `/api/auth/login`           | Log in a user               |
| `PUT`  | `/api/auth/set_address/:id` | Set the address for a user  |
| `POST` | `/api/auth/check_user`      | Check whether a user exists |

### Cart

| Method | Endpoint                   | Description                    |
| ------ | -------------------------- | ------------------------------ |
| `POST` | `/api/cart/add_cart`       | Add a product to the cart      |
| `GET`  | `/api/cart/get/:userId`    | Get a user's cart              |
| `POST` | `/api/cart/product_remove` | Remove a product from the cart |
| `POST` | `/api/cart/update_product` | Update a cart product          |

All request bodies should use JSON. The frontend API base URL should point to this server, for example:

```env
VITE_API_URL=http://localhost:5001/api
```

## Project Structure

```text
backend/
├── server.js              # Application entry point
└── src/
    ├── app.js             # Express app and route registration
    ├── controllers/       # Authentication and cart logic
    ├── db/                # MongoDB connection
    ├── middleware/        # Request middleware
    ├── models/             # Mongoose models
    └── routes/             # API route definitions
```
