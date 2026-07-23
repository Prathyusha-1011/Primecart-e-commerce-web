# 🛒 PrimeCart – MERN E-Commerce Website

## 📖 Overview

PrimeCart is a full-stack e-commerce web application built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js). The application provides users with a seamless online shopping experience while enabling administrators to efficiently manage products, users, and customer orders. It is designed with a responsive user interface, secure authentication, and scalable architecture, making it suitable as a portfolio and academic capstone project.

---

# ✨ Features

## 👤 User Features

- User Registration and Login
- Secure JWT Authentication
- Browse Products
- Search Products by Name
- View Product Details
- Add Products to Cart
- Update Cart Quantity
- Remove Products from Cart
- Place Orders
- View Order History
- Responsive User Interface

---

## 🛠️ Admin Features

- Admin Authentication
- Dashboard Overview
- Add New Products
- Update Existing Products
- Delete Products
- Manage Customer Orders
- Manage Registered Users
- Inventory Management

---

# 🏗️ Technology Stack

## Frontend

- React.js
- React Router DOM
- Axios
- HTML5
- CSS3
- JavaScript (ES6)

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- dotenv
- cors

---

# 📂 Project Structure

```
PrimeCart
│
├── client
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation Guide

## 1. Clone the Repository

```bash
git clone https://github.com/yourusername/PrimeCart.git
```

Move into the project directory.

```bash
cd PrimeCart
```

---

## 2. Backend Setup

Navigate to the server folder.

```bash
cd server
```

Install dependencies.

```bash
npm install
```

Create a `.env` file inside the server folder.

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server.

```bash
npm run dev
```

---

## 3. Frontend Setup

Navigate to the client folder.

```bash
cd client
```

Install dependencies.

```bash
npm install
```

Run the React application.

```bash
npm run dev
```

---

# 🔗 REST API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

---

## Products

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product details |
| POST | `/api/products` | Add new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

---

## Cart

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/cart` | Get cart items |
| POST | `/api/cart` | Add product to cart |
| DELETE | `/api/cart/:id` | Remove product from cart |

---

## Orders

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/orders` | Place an order |
| GET | `/api/orders` | View user orders |

---

# 🔐 Authentication & Security

PrimeCart implements secure authentication using JSON Web Tokens (JWT).

Security measures include:

- Password hashing with bcryptjs
- Protected API routes
- Token-based user authentication
- Environment variable configuration using dotenv
- Cross-Origin Resource Sharing (CORS) support

---

# 📸 Application Screenshots

Replace the placeholders below with screenshots of your application.

## 🏠 Home Page

> Add Screenshot Here

---

## 📦 Product Details

> Add Screenshot Here

---

## 🛒 Shopping Cart

> Add Screenshot Here

---

## 📊 Admin Dashboard

> Add Screenshot Here

---

# 🚀 Future Enhancements

The following features can be added in future versions:

- Wishlist Functionality
- Product Reviews & Ratings
- Online Payment Integration (Stripe/Razorpay)
- Order Tracking System
- Email Notifications
- Discount Coupons
- Product Recommendation System
- Sales Analytics Dashboard
- Dark Mode
- Multi-language Support

---

# 🎯 Learning Outcomes

Developing PrimeCart provided hands-on experience in:

- MERN Stack Development
- REST API Design
- CRUD Operations
- MongoDB Database Design
- User Authentication using JWT
- Password Encryption
- State Management
- API Integration using Axios
- Responsive Web Design
- Client-Server Architecture
- Full-Stack Application Development

---

# 👩‍💻 Author

**Prathyusha**

Bachelor of Science in Artificial Intelligence & Data Science

KPR College of Arts, Science and Research

GitHub: https://github.com/yourusername

LinkedIn: https://linkedin.com/in/yourprofile

---

# 📄 License

This project has been developed for educational and portfolio purposes.

Feel free to fork, modify, and enhance the project for learning.

---

## ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub. Your support is greatly appreciated!

Thank you for visiting PrimeCart!
