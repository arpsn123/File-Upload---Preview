# Candidate Authentication and File Upload System

A secure web application for managing candidate profiles, including registration, login, OTP-based authentication, and file uploads. This project is designed to facilitate candidates in managing their documents securely while ensuring their information is protected.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Routes](#routes)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This application enables candidates to:

- Register with personal details and create an account.
- Log in securely using credentials.
- Verify their identity via an OTP sent to their registered email.
- Upload files (JPEG, PNG, PDF) to a secure server.

## Features

- **User Authentication**: Secure registration and login using bcrypt for password hashing.
- **OTP Verification**: One-time passwords are sent to the registered email for enhanced security.
- **Session Management**: Utilizes cookies for managing user sessions securely.
- **File Upload**: Candidates can upload various file types with size limitations.
- **Route Protection**: Access to certain routes is restricted based on authentication status.

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express**: A minimal and flexible Node.js web application framework.
- **Multer**: Middleware for handling multipart/form-data, primarily for file uploads.
- **Nodemailer**: Module for sending emails (used for OTP).
- **bcrypt**: Library to hash passwords securely.
- **Sequelize**: Promise-based Node.js ORM for relational databases.
- **SQLite**: Lightweight database used for storing user and file information.

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation Steps

1. **Clone the repository**:

   ```bash
   gh repo clone arpsn123/File-Upload---Preview
   cd File-Upload---Preview
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory and add the following:

   ```plaintext
   MAIL_TRAP_HOST=your-mailtrap-host
   MAIL_TRAP_PORT=your-mailtrap-port
   MAIL_TRAP_USERNAME=your-mailtrap-username
   MAIL_TRAP_PASSWORD=your-mailtrap-password
   SOURCE_MAIL=your-source-email@example.com
   ```

4. **Start the server**:

   ```bash
   node main.js
   ```

5. **Open your browser**: Navigate to `http://localhost:3000`.

## Environment Variables

| Variable             | Description                                 |
| -------------------- | ------------------------------------------- |
| `MAIL_TRAP_HOST`     | SMTP host for sending emails via Mailtrap.  |
| `MAIL_TRAP_PORT`     | SMTP port for Mailtrap.                     |
| `MAIL_TRAP_USERNAME` | Mailtrap username for authentication.       |
| `MAIL_TRAP_PASSWORD` | Mailtrap password for authentication.       |
| `SOURCE_MAIL`        | Email address from which OTPs will be sent. |

## Routes

### Public Routes

- **GET /**: Landing page.
- **GET /login**: Login page for candidates.
- **GET /signup**: Registration page for new candidates.
- **POST /signup**: Endpoint for creating a new account.
- **POST /login**: Endpoint for user authentication and sending OTP.
- **POST /verify**: Endpoint for verifying OTP and establishing a session.

### Protected Routes

- **GET /upload**: File upload page (restricted to authenticated users).
- **POST /upload**: Endpoint to process file uploads.

## Usage

1. **Register a New User**:

   - Visit `/signup`, fill out the registration form, and submit.
   - Example request body:
     ```json
     {
       "fullname": "John Doe",
       "username": "johndoe",
       "email": "johndoe@example.com",
       "password": "securepassword",
       "mobileno": "1234567890"
     }
     ```

2. **Log In**:

   - Go to `/login`, enter your credentials, and receive an OTP via email.

3. **Verify OTP**:

   - Submit the received OTP on the `/verify` page to access restricted features.

4. **Upload Files**:
   - Navigate to the `/upload` page to upload documents securely.

## Code Snippet Example

Here's a brief example of the signup and login functionalities using Express and Sequelize:

```javascript
// Signup Route
app.post("/signup", async (req, res) => {
  const { fullname, username, email, password, mobileno } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await Person.create({
      fullname,
      username,
      email,
      password: hashedPassword,
      mobileno,
    });
    return res.redirect("/login");
  } catch (error) {
    console.error("Error during signup:", error);
    return res.redirect("/signup");
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const candidate = await Person.findOne({ where: { username } });
    if (candidate && (await bcrypt.compare(password, candidate.password))) {
      const otp = generateOTP(); // Function to generate OTP
      await sendOTP(candidate.email, otp); // Function to send OTP
      return res.render("verify");
    }
    return res.redirect("/login");
  } catch (error) {
    console.error("Login error:", error);
    return res.redirect("/login");
  }
});
```
