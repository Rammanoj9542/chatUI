# Dockerized ChatBot Frontend Service

   This repository contains a Dockerized ChatBot frontend application.

## Prerequisites

   Before you begin, ensure you have Docker installed on your machine.

## Setup

   1. Clone this repository to your local machine.
      
      ```shell
      git clone <repository-url>
      cd <repository-directory>
      ```

   2. Build the Docker image using the provided Dockerfile.

      ```shell
      docker-compose build
      ```

   3. Start the Docker container.

      ```shell
      docker-compose up
      ```

      The frontend application will be accessible at `http://localhost:3000`.

## Configuration

   The frontend service requires configuration for backend services and Redis. Modify the environment variables in the `docker-compose.yml` file:

   - `BackendServiceIp`: IP address of your backend service.
   - `BackendServicePort`: Port number of your backend service.
   - `REDIS_HOST`: Hostname of your Redis server.
   - `REDIS_PASSWORD`: Password for your Redis server (if applicable).
   - `REDIS_PORT`: Port number of your Redis server.

## Setting Environment Variables

   ### Windows

   1. Using Command Prompt:

      ```shell
      set BackendServiceIp=<backend-ip>
      set BackendServicePort=<backend-port>
      set REDIS_HOST=<redis-host>
      set REDIS_PASSWORD=<redis-password>
      set REDIS_PORT=<redis-port>
      ```
   2. Using PowerShell:

      ```shell
      $env:BackendServiceIp="<backend-ip>"
      $env:BackendServicePort="<backend-port>"
      $env:REDIS_HOST="<redis-host>"
      $env:REDIS_PASSWORD="<redis-password>"
      $env:REDIS_PORT="<redis-port>"
      ```
   3. Permanent Environment Variables:

      - Go to Control Panel > System and Security > System > Advanced system settings.
      - Click on Environment Variables.
      - Add or edit `BackendServiceIp`, `BackendServicePort`, `REDIS_HOST`, `REDIS_PASSWORD`, and `REDIS_PORT` under System Variables.

   ### Ubuntu/WSL

   1. Setting Environment Variables:

      Open a terminal and export the variables:

         ```shell
            export BackendServiceIp=<backend-ip>
            export BackendServicePort=<backend-port>
            export REDIS_HOST=<redis-host>
            export REDIS_PASSWORD=<redis-password>
            export REDIS_PORT=<redis-port>
         ```
   2. Permanent Environment Variables:

      To make these changes permanent for your user, add these lines to your ~/.bashrc or ~/.bash_profile:

       ```shell
         echo 'export BackendServiceIp=<backend-ip>' >> ~/.bashrc
         echo 'export BackendServicePort=<backend-port>' >> ~/.bashrc
         echo 'export REDIS_HOST=<redis-host>' >> ~/.bashrc
         echo 'export REDIS_PASSWORD=<redis-password>' >> ~/.bashrc
         echo 'export REDIS_PORT=<redis-port>' >> ~/.bashrc
         source ~/.bashrc
      ```
## Ports

   By default, the Docker container maps port 3000 to the host system's port 3000. Adjust port mappings in `docker-compose.yml` if necessary.
