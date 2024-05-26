# Get-YOLO

## Introduction
Get-YOLO is a reminder application that allows users to create reminders with scheduled messages. The application consists of a backend built with Node.js, Express, and MongoDB, and a frontend built with React. 

## Table of Contents
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Cron Expression Guide](#cron-expression-guide)
- [Usage](#usage)
- [Features](#features)

## Backend Setup

1. Clone the repository and navigate to the backend directory:
    ```sh
    git clone https://github.com/SashankKantamsetti/Get-YOLO
    cd Get-YOLO/yolo
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the backend server:
    ```sh
    npm run start:dev
    ```

## Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd Get-YOLO/client/yolo-client
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the frontend server:
    ```sh
    npm start
    ```

## Cron Expression Guide

The `schedule` field in reminders uses cron expressions to define the schedule. A cron expression is a string comprising five fields separated by spaces:

`* * * * *`
`│ │ │ │ │`
`│ │ │ │ │`
`│ │ │ │ └─── Day of the week (0 - 7) (0 or 7 is Sunday, 1 is Monday, etc.)`
`│ │ │ └────── Month (1 - 12)`
`│ │ └────────── Day of the month (1 - 31)`
`│ └────────────── Hour (0 - 23)`
`└───────────────── Minute (0 - 59)`



### Examples:

- `* * * * *` : Every minute
- `0 * * * *` : Every hour at minute 0
- `0 0 * * *` : Every day at midnight
- `0 9 * * 1` : Every Monday at 9:00 AM

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Create a new reminder by filling out the form with your reminder details, including the cron schedule string.
3. View, update, or delete existing reminders from the list.
4. View the history of each reminder by clicking the "View History" button.

## Features

- Create reminders with a specific message, email, and schedule.
- Update and delete existing reminders.
- View the history of reminders, including when they were triggered or updated.


