# Real-Time Chat Application (MERN | Socket.io)

![Chat App Logo](frontend/public/chat_people.png)

A real-time chat application built using the MERN stack. This app allows users to sign up, log in, and chat with others in real-time. It supports features such as email verification, JWT authentication, and secure backend communication. The frontend is built using React and Vite with a stylish UI using Tailwind CSS and DaisyUI.

---

## Features

- **Real-time Messaging**: Chat in real-time with other users using Socket.IO for instant message delivery.
- **User Authentication**: Secure login and registration with JWT authentication.
- **Email Verification**: Ensure only verified users can access the chat platform.
- **Responsive UI**: Built with Tailwind CSS and DaisyUI for a smooth, responsive design.
- **Modern Frontend**: Developed using React and Vite for fast and efficient frontend performance.
- **Backend Services**: RESTful API connection between the frontend and backend using Axios interceptors.
- **Best Practices**: The app follows best practices in both frontend and backend development for maintainability and scalability.
- **Cookie-Based Authentication**:  
  The application uses **cookie-based authentication** to securely store JWT tokens in **HttpOnly cookies**, preventing access via JavaScript and reducing the risk of **Cross-Site Scripting (XSS)** and **Cross-Site Request Forgery (CSRF)** attacks. This ensures seamless login while protecting sensitive information.

---

## Tech Stack

- **Frontend**:

  - React
  - Vite (for fast build and hot-reload)
  - Tailwind CSS (for custom styling)
  - DaisyUI (for pre-built UI components)
  - Axios (for API requests)
  - Axios Interceptors (for automating token refresh process)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (NoSQL database)
  - Socket.IO (for real-time communication)
  - JWT Authentication (for secure token-based user authentication)

---

## Installation & Setup

### Prerequisites

Before getting started, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use a cloud instance like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- [Git](https://git-scm.com/)

### Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/e19465/real-time-chat-app-MERN.git
```
