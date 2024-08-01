# WTWR (What to Wear?): Back End

## Description

The backend for the WTWR (What to Wear?) web application which is designed to help users decide what to wear based on the current weather. It allows users to perform various operations such as creating, reading, updating, and deleting clothing items. Additionally, users can like or dislike items to indicate their preferences.

## Functionality

- **Create:** Users can create new clothing items by providing details such as the item's name, weather type, and an image URL.
- **Read:** Users can view all existing clothing items and access detailed information about each item.
- **Delete:** Users can delete unwanted clothing items from the system.
- **Like/Dislike:** Users can express their preference for a clothing item by liking or disliking it. The system keeps track of the number of likes for each item.
- **User Management:** Users can also be created and managed within the system.

## Technologies Used

- **Node.js:** Server-side JavaScript runtime environment.
- **Express.js:** Web application framework for building RESTful APIs.
- **MongoDB:** NoSQL database for storing clothing items and user data.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js.
- **RESTful API:** Follows REST architectural principles for designing API endpoints.
- **Middleware:** Utilizes Express middleware for request handling, error management, and authentication.
- **Error Handling:** Implements custom error handling middleware for managing various types of errors.
- **Authorization:** Implements basic authorization middleware for user authentication and access control.
- **Testing:** Testing is done using Postman and Github actions
- **Git:** Version control system for tracking changes to the project codebase.
- **Postman:** API development and testing tool for manually testing API endpoints during development.
- **Google Cloud:** Cloud platform for deploying and managing the website.

## API Documentation

The API endpoints and their functionalities are documented below:

- **GET /items:** Returns all clothing items.
- **POST /items:** Creates a new clothing item.
- **DELETE /items/:itemId:** Deletes a clothing item by ID.
- **PUT /items/:itemId/likes:** Likes a clothing item.
- **DELETE /items/:itemId/likes:** Removes a like from a clothing item.
- **GET /users:** Returns all users.
- **GET /users/:userId:** Returns a user by ID.
- **POST /users:** Creates a new user.

## Testing

This project has been tested using Postman and Github actions

## LINK TO PROECT

https://blakesdomain.crabdance.com

## Credit

- Blake Cameron
