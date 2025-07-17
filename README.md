# GraphQL Server

A Node.js GraphQL server with authentication, user management, and email utilities.

## Folder Structure

```
server/
  package.json
  package-lock.json
  .env
  .env-dist                       # find all the enviromental variables used in the application
  src/
    config/
      connection.mongoose.js      # MongoDB connection setup
      corsConfig.js               # CORS configuration
      graphqlConfig.js            # GraphQL server configuration
    graphql/
      index.js                    # GraphQL entry point
      resolvers/
        auth.resolvers.js         # Authentication resolvers
        user.resolvers.js         # User-related resolvers
      typeDefs/
        auth.typeDefs.js          # Authentication type definitions
        user.typeDefs.js          # User type definitions
    index.js                      # Main server entry point
    middleware/
      auth.js                     # Authentication middleware
    models/
      user.model.js               # User Mongoose model
    utils/
      bcrypt.js                   # Password hashing utilities
      email/
        emailTransporter.js       # Nodemailer transporter setup
        sendEmail.js              # Email sending utility
      templates/
        resetPasswordTemplate.js  # Email template for password reset
```

## Prerequisites

- Node.js (v14 or above recommended)
- npm
- MongoDB instance (local or remote)

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/muhammad-hamza-liaqat/node-with-graphQL
   cd graphql/server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   - Create a `.env` file in the `server` directory.
   - Add the following variables (example):
     ```
     MONGODB_URI=mongodb://localhost:27017/your-db
     JWT_SECRET=your_jwt_secret
     EMAIL_USER=your_email@example.com
     EMAIL_PASS=your_email_password
     ```

4. **Run the server:**

   ```bash
   npm start
   ```

   Or, for development with auto-reload:

   ```bash
   npm run dev
   ```

5. **Access GraphQL Playground:**
   - Visit `http://localhost:8000/graphql` in your browser.
   - Visit `http://localhost:8000/` in your browser to check server is up or not!.

## Scripts

- `npm start` — Start the server
- `npm run dev` — Start the server with nodemon for development

## Features

- User authentication (JWT)
- Password hashing (bcrypt)
- Email sending (Nodemailer)
- Modular GraphQL schema and resolvers

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
