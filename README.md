# 🔗 URL Shortener with Authentication & Authorization

A simple and secure URL Shortening web application built using **Node.js**, **MongoDB**, and **EJS** templating. Authenticated users can create, manage, and track shortened URLs. Authorization ensures route access based on user roles.

---

## 🚀 Features

- 🔐 **User Authentication** (Login, Register, Cookie-based Sessions)
- ✅ **Authorization** (Role-based: NORMAL, ADMIN)
- 🔗 **Short URL Generation**
- 📊 **Visit Tracking with Timestamp**
- 📄 **EJS View Rendering**
- 🌐 RESTful Routes
- 🛡️ Middleware for Authentication & Authorization

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Templating:** EJS
- **Auth:** JWT (Stored in HTTP-only cookies)
- **Other:** Cookie Parser, Dotenv, Nodemon

---

## 📂 Folder Structure

```

├── controller/
│   ├── url.js
│   └── user.js
├── models/
│   ├── url.js
│   └── user.js
├── routes/
│   ├── url.js
│   ├── user.js
│   └── staticRouter.js
├── middleware/
│   └── auth.js
├── service/
│   └── auth.js
├── views/
│   └── *.ejs
├── index.js
├── connect.js
├── package.json
```

---

## 🧪 Authentication & Authorization Flow

### 🔑 Authentication (JWT-based)
- On successful login, a JWT token is created and stored in cookies.
- `checkForAuthentication` middleware extracts and verifies the token.
- User info is attached to `req.user`.

### 𞶂 Authorization
- `restrictTo(['NORMAL'])` middleware allows access only to certain roles.
- Useful for protecting routes like URL creation or admin panels.

---

## 🛠️ Installation

1. **Clone the repo**
```bash
git clone https://github.com/your-username/url-shortener-auth.git
cd url-shortener-auth
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file:
```
MONGODB_URL=mongodb://localhost:27017/short-url
JWT_SECRET=your_jwt_secret
PORT=8001
```

4. **Run the app**
```bash
npm start
```

---

## 👤 User Roles

- `NORMAL`: Can create and view their own short URLs.
- `ADMIN`: (optional extension) Can manage all users and URLs.

---



