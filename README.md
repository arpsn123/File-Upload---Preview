# Candidate Authentication and File Upload System

![GitHub Repo Stars](https://img.shields.io/github/stars/arpsn123/UploadHub?style=social)
![GitHub Forks](https://img.shields.io/github/forks/arpsn123/UploadHub?style=social)
![GitHub Issues](https://img.shields.io/github/issues/arpsn123/UploadHub)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/arpsn123/UploadHub)
![GitHub Last Commit](https://img.shields.io/github/last-commit/arpsn123/UploadHub)
![GitHub Contributors](https://img.shields.io/github/contributors/arpsn123/UploadHub)
![GitHub Repo Size](https://img.shields.io/github/repo-size/arpsn123/UploadHub)
![GitHub Language Count](https://img.shields.io/github/languages/count/arpsn123/UploadHub)
![GitHub Top Language](https://img.shields.io/github/languages/top/arpsn123/UploadHub)
![GitHub Watchers](https://img.shields.io/github/watchers/arpsn123/UploadHub?style=social)
![Maintenance Status](https://img.shields.io/badge/Maintenance-%20Active-green)


## Overview

The **Candidate Authentication and File Upload System** is a robust web application designed for managing candidate profiles securely. It facilitates the registration, authentication, and document upload processes while ensuring the confidentiality and integrity of candidate data.

### Key Objectives
- Enable candidates to register and manage their accounts securely.
- Implement OTP-based authentication to verify user identity.
- Allow candidates to upload various document types in a secure environment.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Routes](#routes)
- [Usage](#usage)
- [Code Snippets](#code-snippets)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication**: Implements secure registration and login processes with password hashing using `bcrypt`.
- **OTP Verification**: Sends one-time passwords to registered emails, enhancing security.
- **File Uploads**: Supports various file formats with strict size limits using `Multer`.
- **Session Management**: Utilizes sessions to maintain user authentication status.
- **Route Protection**: Restricts access to sensitive routes based on authentication status.

## Technologies Used
![Node.js](https://img.shields.io/badge/Node.js-v16%2B-brightgreen)
![Express](https://img.shields.io/badge/Express-v4.17.1-blue)
![Sequelize](https://img.shields.io/badge/Sequelize-v6.6.5-blue)
![SQLite](https://img.shields.io/badge/SQLite-v3.34.1-blue)
![Multer](https://img.shields.io/badge/Multer-v1.4.2-orange)
![Nodemailer](https://img.shields.io/badge/Nodemailer-v6.6.1-blue)
![bcrypt](https://img.shields.io/badge/bcrypt-v5.0.1-yellow)

- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for building RESTful APIs.
- **Sequelize**: ORM for managing database interactions.
- **SQLite**: Lightweight database engine for storing user data.
- **Multer**: Middleware for handling file uploads.
- **Nodemailer**: Module for sending emails for OTP verification.
- **bcrypt**: Library for hashing passwords securely.

## Project Structure

```plaintext
file-upload-site/
├── models/
│   ├── filedata.js        # File_Data model for storing file info
│   └── persons.js         # Person model for storing user info
├── routes/
│   ├── login.js           # Login routes and logic
│   ├── signup.js          # Signup routes and logic
│   └── verify.js          # OTP verification logic
├── services/
│   ├── auth.js            # Session management functions
│   ├── generate_otp.js    # Function to send OTP to users
│   └── sharedmemory.js     # Shared memory functions for storing OTP and candidate
├── middlewares/
│   └── restrict.js        # Middleware to restrict access to logged-in users
├── views/
│   ├── landing.ejs        # Landing page
│   ├── login.ejs          # Login page
│   ├── signup.ejs         # Signup page
│   ├── upload.ejs         # File upload page
│   └── success.ejs        # Success page after file upload
├── main.js                # Main application file
└── package.json           # Node.js dependencies and scripts
```
# Setup Instructions

## Prerequisites

* Node.js (version 14 or higher)
* npm (Node package manager)

## Installation Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/arpsn123/File-Upload---Preview
    cd File-Upload---Preview
    ```
2. **Install dependencies**:
    ```bash
    npm install
    ```
3. **Configure environment variables**: Create a `.env` file in the root directory and add the following:
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

# Environment Variables

| Variable            | Description                                         |
|---------------------|-----------------------------------------------------|
| `MAIL_TRAP_HOST`    | SMTP host for sending emails via Mailtrap.         |
| `MAIL_TRAP_PORT`    | SMTP port for Mailtrap.                            |
| `MAIL_TRAP_USERNAME`| Mailtrap username for authentication.               |
| `MAIL_TRAP_PASSWORD`| Mailtrap password for authentication.               |
| `SOURCE_MAIL`       | Email address from which OTPs will be sent.        |

# Routes

## Public Routes

* **GET /**: Landing page.
* **GET /login**: Login page for candidates.
* **GET /signup**: Registration page for new candidates.
* **POST /signup**: Endpoint for creating a new account.
* **POST /login**: Endpoint for user authentication and sending OTP.
* **POST /verify**: Endpoint for verifying OTP and establishing a session.

## Protected Routes

* **GET /upload**: File upload page (restricted to authenticated users).
* **POST /upload**: Endpoint to process file uploads.

# Usage

1. **Register a New User**:
    * Visit `/signup`, fill out the registration form, and submit.
    * Example request body:
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
    * Go to `/login`, enter your credentials, and receive an OTP via email.
3. **Verify OTP**:
    * Submit the received OTP on the `/verify` page to access restricted features.
4. **Upload Files**:
    * Navigate to the `/upload` page to upload documents securely.

# Code Snippets

## User Registration Example

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
```
## User Login Example

```javascript
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
## OTP Verification Example

```// OTP Verification Route
app.post("/verify", async (req, res) => {
    const { otp } = req.body;
    // Logic to verify OTP
    if (isValidOTP(otp)) {
        // Set session
        req.session.userId = candidate.id;
        return res.redirect("/upload");
    }
    return res.redirect("/verify");
});
```

## File Upload Example

```// File Upload Route
app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        // Save file information to the database
        await FileData.create({
            userId: req.session.userId,
            filename: req.file.originalname,
            filepath: req.file.path,
        });
        return res.redirect("/success");
    } catch (error) {
        console.error("File upload error:", error);
        return res.redirect("/upload");
    }
});
```
