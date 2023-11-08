# Realtime CodeEditor Frontend

Welcome to the frontend of the CodeBy Realtime CodeEditor project. This frontend provides a user-friendly interface for creating and managing code editing rooms with real-time collaboration features and alerts.

## Accessing the WebApp
[![screenshot](./docs/screenshot.png)](https://codeby-prod-frontend.onrender.com/)

You can access the deployed version of the CodeBy Realtime CodeEditor frontend on Render at

LIVE - [https://codeby-prod-frontend.onrender.com/](https://codeby-prod-frontend.onrender.com/). 

Enjoy using the web app for seamless real-time code collaboration. 

### Features

-   Create and manage code editing rooms.
-   Real-time code collaboration using SocketIO.
-   Store and retrieve code contents in a Redis database.
-   Support multiple users and concurrent rooms for collaborative coding sessions.

## Running the Frontend with Docker Locally

To run the CodeBy Realtime CodeEditor frontend using Docker, follow these steps:

1. **Clone the Repository**: First, clone the repository containing the frontend code.

2. **Docker Compose File**:
    - Ensure you have Docker and Docker Compose installed on your system.
    - Check that you have a `docker-compose.yml` file, This file defines the setup for your React app and specifies the backend URL.

    For development, change the `Dockerfile` to `Dockerfile.dev`

    ```
    build:
        context: .
        dockerfile: Dockerfile.dev
    ```

3. **Dockerfile**:
    - `Dockerfile` in the project directory sets up the environment for the React app in production and customizes NGINX for client-side routing.

4. **Build and Run**:
    - Open a terminal and navigate to your project directory.
    - Build and run the Docker image by running the following command:

    ```
    docker compose up --build
    ```

    This will start the React app, and it will be accessible at `http://localhost:3000`.


## Additional Information

For more information about myself and to stay updated with the projects, you can visit my [portfolio](https://abduttayyeb.github.io) and connect with me on [LinkedIn](https://linkedin.com/in/abduttayyeb).