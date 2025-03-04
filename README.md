# Incruiter - Node.js Project | JWT Authentication

## Table of Contents

1. [Installation](#installation)
2. [Setting up Environment Variables](#setting-up-environment-variables)
3. [Running the Project](#running-the-project)
4. [Routes Documentation](#routes-documentation)
   - [POST /api/auth/signup](#post-apiroute1)
   - [POST /api/auth/login](#post-apiroute2)
   - [POST /api/auth/password/reset](#post-apiroute3)
   - [GET /api/protected/user](#get-apiroute4)
---

## Installation

To run the project locally, you need to clone the repository and install the necessary dependencies.

1. Clone the repository:

   ```bash
   git clone https://github.com/ramprasad-13/Incruiter.git
   cd Incruiter

2. Install the required dependencies using npm:

   ```bash
   npm install

   This will install all the necessary packages listed in the package.json file.

3. Setting up Environment Variables
For local development, you will need to set up some environment variables. You can store these variables in a .env file in the root directory of the project. This file will be ignored by Git (thanks to .gitignore), so it won’t be committed.

    1. Create a .env file in the root directory of the project:
    ```bash
    touch .env
    2. Add the necessary environment variables to the .env file. These are necessary Variables:

    ```bash
    MONGO_URI=give local server url or mongodb atlas url
    JWT_SECRET=this-is-a-top-secret
    APP_USER='your_email.com'
    APP_PASS='your_password_got_from_apppasswords_in_google_acc'
    CORS_ORIGIN='define * if you want to allow any frontend, other wise give frontend deployed domain'

    Replace the values with your own environment-specific values.

Running the Project
To run the project locally, follow these steps:

Ensure your environment variables are set up (as shown in the "Setting up Environment Variables" section).

Run the Node.js server using the following command:
    ```bash
    npm run start
    or
    npm run dev
This will start the server using the configuration from package.json.

The application will typically be available at http://localhost:3000 (or whatever port you’ve specified in your .env file).

Routes Documentation
Below is an overview of the available routes for the project.

[Routes Documentation](#routes-documentation)
   - [POST /api/auth/signup]
   Send these required fields in body
   1.email
   2.password
   3.mobileNumber
   4.fullName
   5.role

   As a Result it will send a email for verification. On successful verification user will be created.

   - [POST /api/auth/login]
   send these required fields in body
   1.email
   2.password

   As a Result it will authenticate user and generate a token on sucessful login.

   - [POST /api/auth/password/reset]
   send these required fields in body
   1.email
   2.password

   Here password field is the new password user want's to change. Upon reset you will get a email with verification, on verifying the link. The new password will be updated.

   - [GET /api/protected/user]

   If you are not logged-in and try to view this protected Routed You will get a Access denied message. To view this protected Route You need to login which gives you a token(jwt), now send the GET request by adding Authorization as key and 'Bearer token' as the value in request Headers. Now, you will able see info about logged-in user.

   - [GET /]
   If you want to just check, if App is Up and Running Successfully, then just hit this Route.
