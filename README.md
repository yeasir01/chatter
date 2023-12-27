# Chatter
Welcome to Chatter, a robust real-time chat application with enhanced features including user authentication through both Google Social Login and traditional Email/Password signup. This application is built using a powerful stack that includes Node.js, Socket.io, Express, React, Material-UI (MUI), Zustand, PostgreSQL, Prisma, and Auth0 for secure and seamless user authentication.

## Getting Started
1. **Clone the Updated Repository:**
```
$ git clone https://github.com/yeasir01/chatter.git
cd chatter
```
2. **Install Dependencies:**
```
$ npm install
```
3. **Configure Auth0:**
* Set up an Auth0 account: Auth0
* Create a new Auth0 application and obtain your credentials (client ID, client secret).
* Update the .env file with your Auth0 credentials

4. **Run the Application:**
```
npm start
```
5. Visit https://localhost:3000 in your browser. (https required for auth)


## Auth0 Configuration
To enable Google Social Login and Email/Password signup, follow these steps:

1. **Auth0 Dashboard:**
* Log in to your Auth0 Dashboard.
* Create a new Auth0 application.
* Configure the allowed callback URLs for your application.

2. **Update .env file:**
```
REACT_APP_AUTH0_DOMAIN=your-auth0-domain
REACT_APP_AUTH0_CLIENT_ID=your-client-id
REACT_APP_AUTH0_REDIRECT_URI=http://localhost:3000/callback
REACT_APP_AUTH0_AUDIENCE=https://your-api-audience
```

## Features Overview
#### Real-Time Communication:
* Utilize Socket.io for efficient and reliable real-time messaging.
#### User Interaction:
* Enjoy features such as typing indicators, user online status, and profile updates.
#### Notifications:
* Receive instant notifications for new messages, ensuring you stay informed.
#### Chats:
* Engage in both group and private chats, with messages and photos sent in real-time.
#### Database Storage:
* Securely store all chat data in a PostgreSQL database, ensuring data persistence.
#### Themes:
* Personalize your experience with both dark and light themes, with more to come.

## Technologies Used
* Backend:
    * Node.js
    * Express
    * Socket.io
    * Prisma
    * PostgreSQL

* Frontend:
    * React
    * Material-UI (MUI)
    * Zustand
    * Auth0

## Contributing
If you'd like to contribute to ChatApp, feel free to fork the repository, make your changes, and submit a pull request. Your contributions are highly appreciated!

## License
This project is licensed under the MIT License - see the LICENSE file for details.
Enjoy using ChatApp for seamless and dynamic communication!