# Monitoring RESTful API Server
Build an uptime monitoring RESTful API server that allows authenticated users to monitor URLs, and get detailed uptime reports about their availability, average response time, and total uptime/downtime.

This repository contains a backend application for an uptime monitoring RESTful API server. The server allows authenticated users to monitor URLs and retrieve detailed uptime reports about their availability, average response time, total uptime, and downtime.

The application relies on using Node.js as the server and MongoDB as the database to store monitoring data and reports. Access security and authentication are implemented using JWT (JSON Web Tokens) to ensure that only authorized users can access their own data.

The API is designed to be user-friendly and follows the RESTful format. Users can add URLs for monitoring and retrieve reports based on their specific requirements. Additionally, historical logs are stored for the reports, allowing users to monitor performance over time and identify periods of downtime.

The server provides reliable API endpoints for create, read, update, and delete (CRUD) operations on monitoring objects, as well as viewing detailed reports. Developers can add additional features based on future project requirements.

This project provides a robust framework for building uptime monitoring and analysis systems and can be used in various other applications that require monitoring and tracking the availability of online services.

## Installation and Setup

1-Clone the Repository:

Begin by cloning this repository to your local machine using Git.
Open your terminal or command prompt and run the following command:
bash
git clone <repository_url>   //Replace <repository_url> with the URL of the repository you want to clone.
///////////////////////////////////////
2-Install Dependencies:

Navigate to the project's root directory in the terminal.
Install the required dependencies by running the following command:
bash
cd <project_directory>
npm install
////////////////////////////////////
3-Configure Environment Variables:

Create a .env file in the root directory of the project.
Inside the .env file, provide the necessary environment variables with your own values:
MONGO_URI=your_mongodb_connection_string
PORT=4000
EMAIL_ADDRESS=your_email_address_for_notifications
EMAIL_PASSWORD=your_email_password
JWT_SECRET=your_secret_for_json_web_tokens
Replace the placeholders with the actual values for each environment variable.

Start the Server:
/////////////////////////////////
4-Once you have set up the environment variables, start the server by running the following command:

The server will start running on http://localhost:4000.



## API Documentation
API documentation is available at http://localhost:4000/api-docs/.

## Docker-compose
To run the application using Docker-compose, follow these steps:

1. Make sure Docker is installed on your machine.
2. run  docker-compose up on your terminal

The server will start inside a Docker container and will be accessible at http://localhost:3000.

## Routes
### User Routes
- Signup a user -> POST /user/signup   
 /////////////////////////         
- Login a user ->  POST /user/login    
/////////////////////////
- Logout a user ->  GET /user/logout   
### Check Routes
- Create a new check -> POST /check
//////////////////////////
- Get all checks -> GET /check      
/////////////////////////      
- Get reports for a check by URL -> GET /check/reports
/////////////////////////
- Delete a check by ID ->  DELETE /check/:id    
/////////////////////////
- Get reports for checks with a specific tag ->  GET /check/tags/:tag 
    
## Technologies Used
- Node.js
- Express.js
- MongoDB
- Swagger
- Docker