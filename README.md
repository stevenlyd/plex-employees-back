# Plexxis Employees Backend

## Overview

The Plexxis Employees Backend is a robust and efficient back-end service for the Plexxis Employees Front application. It's built using NestJS with TypeScript and provides CRUD operations for managing employee information through a REST API. The application uses PostgreSQL as the database and Prisma as the ORM.

## Features

-   CRUD operations for employee data
-   ValidatePipe for DTO format validation in a whitelist mode
-   Cursor-based pagination for efficient data handling
-   PostgreSQL for data storage
-   Prisma ORM for database operations
-   Search functionality for employee data

## Technologies Used

-   NestJS with TypeScript
-   PostgreSQL
-   Prisma ORM
-   ValidatePipe

## Setup

1.  Clone the repository to your local machine.
    
    ```
    git clone https://github.com/stevenlyd/plex-employees-back.git
    ``` 
    
2.  Install the required dependencies.
    ```
    npm install
    ``` 
    
3.  Create a new `.env` file in the root folder and add the necessary database configuration variables.
    ```
    DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"
    ``` 
5.  Run the database migrations.
    ```
    npx prisma migrate dev --name init
    ``` 
6.  Run the application.
    ```
    npm run start
    ``` 

The backend API will run on `http://localhost:3001`.

## Application Flow

1.  The backend service receives requests from the front-end application and performs the necessary CRUD operations on the employee data.
    
2.  Requests are validated using NestJS's ValidatePipe in a whitelist mode. Only requests with valid data will be processed, while others will be filtered out.
    
3.  The application supports cursor-based pagination to efficiently handle large datasets and avoid potential performance issues.
    
4.  The backend service communicates with a PostgreSQL database using Prisma as the ORM for managing employee data.
    
5.  Search functionality is provided for employee data. If a search parameter is included, the API will perform a search. If no search parameter is present, the API will treat the request as a normal "findAll" request.
    

## API Endpoints

-   `GET /employees`: Retrieve a list of employees with cursor-based pagination and optional search functionality
-   `GET /employees/:id`: Retrieve a specific employee by ID
-   `POST /employees`: Create a new employee
-   `PATCH /employees/:id`: Update an existing employee by ID
-   `DELETE /employees/:id`: Delete an employee by ID
