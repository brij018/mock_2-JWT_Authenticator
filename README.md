# 🔐 JWT Authenticator

Hey there! 👋

Welcome to **JWT Authenticator**, a backend project I built to explore authentication, authorization, and role-based access control using JSON Web Tokens (JWT).

The idea was to go beyond basic login and registration and understand how authentication works in real-world applications. From managing user sessions to restricting access based on roles, this project gave me a chance to put backend security concepts into practice.

It also includes API endpoints for managing users, registering admins and managers, and handling multiple active sessions.

---

## ✨ What's Inside?

- 🔐 JWT-based authentication
- 👤 User registration and login
- 🚪 Logout and logout from all sessions
- 🛡️ Role-based access control
- 👑 Admin and manager registration
- 🔍 User search
- 👥 User management
- 🗑️ Bulk user deletion

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- JavaScript
- JSON Web Tokens (JWT)
- REST APIs
- Postman for API testing

---

## 📡 API Endpoints

Here's a quick look at the endpoints included in the project.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | User Register | Register a new user |
| GET | Login | Authenticate a user |
| GET | Logout | Log out of the current session |
| GET | Logout All | Log out of all active sessions |
| GET | Search | Search for users |
| GET | Delete Multiple | Delete multiple users |
| GET | Get All Users | Retrieve registered users |
| GET | Admin Register | Register an admin |
| GET | Manager Register | Register a manager |
| GET | Get All Managers | Retrieve registered managers |

**Note:** The endpoint names above reflect the API collection. Check the route files for their exact URL paths.

---

## 📸 API Screenshots

All screenshots are organized by endpoint so you can see how each API behaves and what its response looks like.

### 1. 👤 User Registration

Create a new user account.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3827aea0-4dea-47c0-93a4-3f5fde1557f4" />


---

### 2. 🔑 Login

Authenticate a user and establish a session.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/dc0a593d-4008-4b19-bd87-f3073397360f" />


---

### 3. 🚪 Logout

End the current user session.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/efe75332-8e29-4b92-a789-be551b5aafb3" />


---

### 4. 🔒 Logout All

Log out of all active sessions.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2990ac39-0ace-40e0-ada6-9710722b1031" />


---

### 5. 🔍 Search Users

Search for users through the API.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/06ba4541-8512-498d-a784-2a91fddab655" />


---

### 6. 👥 Get All Users

Retrieve the list of registered users.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/dfe4c27a-a178-4cc5-a849-f773a38c4217" />


---

### 7. 👑 Admin Registration

Register a user with an admin role.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1825f040-bc3b-4e9c-9b39-f037f701249b" />


---

### 8. 🧑‍💼 Manager Registration

Register a user with a manager role.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/58262f8c-fab5-4a93-adb9-7e62dc91089b" />


---

### 9. 📋 Get All Managers

Retrieve the list of registered managers.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/72207353-efa3-45c0-b93f-30773650ba77" />


---

## 🚀 Getting Started

Want to try it yourself? Here's how to get the project running locally.

### 1. Clone the repository

```bash
git clone https://github.com/brij018/mock_2-JWT_Authenticator.git
```

### 2. Navigate into the project

```bash
cd mock_2-JWT_Authenticator
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure your environment

Create a `.env` file in the project root and add the environment variables required by the application.

Never commit real credentials, JWT secrets, or database passwords to GitHub.

### 5. Start the server

Use the development or start script defined in your `package.json`.

For example, if the project has a development script:

```bash
npm run dev
```

---

## 🧪 Testing the APIs

I used Postman to work with and test the API endpoints.

To try them out:

1. Start the backend server.
2. Open Postman.
3. Enter the appropriate endpoint URL and HTTP method.
4. Provide the required request body, headers, or authentication token.
5. Send the request and inspect the response.

For protected endpoints, make sure you're authenticated and have the required permissions.

---

## 📚 What I Practiced

- JWT authentication
- Authentication and authorization
- Role-based access control
- Express middleware
- REST API development
- User management
- Session handling
- API testing with Postman
- Error handling

---


## 👨‍💻 About Me

Hey! I'm a Computer Science student and Full Stack Developer who enjoys building web applications, exploring AI, and learning new technologies through hands-on projects.

Check out more of my work:

**GitHub:** https://github.com/brij018

---

⭐ If you found this project useful, consider giving the repository a star!
