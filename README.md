# Currency Exchange API

# Table of Contents

1. [Overview](#overview)
2. [Features](#features)
    - [Caching](#caching)
    - [Rate Limiting](#rate-limiting)
    - [Unit Tests](#unit-tests)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Without Docker Installation](#without-docker-installation)
   - [With Docker Installation](#with-docker-installation)
4. [API Documentation](#api-documentation)

## Overview
The Currency Exchange API is a RESTful service designed to facilitate currency conversion using the [APYHub](https://apyhub.com/utility/currency-conversion-multiple?ref=public_apis) platform. It allows users to convert currencies easily by specifying a source currency and a list of target currencies.

## Features

- **Convert Currency**: Convert from a specified source currency to multiple target currencies.
- **Authentication**: Secure endpoints that require authentication using a bearer token.
- **Error Handling**: Robust error handling for invalid requests and authentication failures.
- **Docker Compose**: Containerized deployment using Docker Compose for simplified management and deployment.
  Used PM2 to run nodejs providing continuous monitoring using logs and automatic restarts when deployed on a server
- **Caching**
- **Rate Limiting**
- **Unit Tests**:
### Caching 
Implement caching to reduce the number of requests to the external API. (using node-cache and for Short-Term Cache (1 Hour))

  Here is time comparaison for a cached and uncached API call (5 ms vs 3.5 sec)
  ![image](https://github.com/Rofaydaaa/Currency-Exchange-Public-API/assets/125312170/3cc7e8cf-32fa-4658-8018-0bfe7bdae80b)
  ![image](https://github.com/Rofaydaaa/Currency-Exchange-Public-API/assets/125312170/f68104c9-17b2-40fa-97f6-f612a481507e)
### Rate Limiting
Implementing checks on a convert API to ensure that each user can only perform 100 API requests per hour(will change it to a smaller amount when runing the unit test as shown in the next point), I will be using express-rate-limit library
### Unit Tests 
  Here are the implemented tests
  ![image](https://github.com/Rofaydaaa/Currency-Exchange-Public-API/assets/125312170/3c3fa524-3385-4dbc-947b-5df9d90619ba)
  ![image](https://github.com/Rofaydaaa/Currency-Exchange-Public-API/assets/125312170/0807ef61-7f65-409b-bcbc-2362135e79fb)
  ![image](https://github.com/Rofaydaaa/Currency-Exchange-Public-API/assets/125312170/5f55eb8e-f94f-4775-a057-35d7234e2c9e)


## Getting Started
### Prerequisites
- Node.js
- npm (Node Package Manager)
- Docker

### Without Docker Installation
**Clone the repository:**

```bash
git clone https://github.com/Rofaydaaa/Currency-Exchange-Public-API.git
cd Currency-Exchange-Public-API
```

**Install dependencies:**
```bash
npm install
```

**Set up environment variables:**<br>
Create a .env file in the root directory with the following variable (find this token after creating an account on [APYHub](https://apyhub.com/utility/currency-conversion-multiple?ref=public_apis)):
```bash
APY_TOKEN=your_apyhub_token
```
**Start the server using npm:**

```bash
npm start
```
The server will start running on http://localhost:3000.

**To run tests**
```bash
npm test
```

### With Docker Installation
**Clone the repository:**

```bash
git clone https://github.com/Rofaydaaa/Currency-Exchange-Public-API.git
cd Currency-Exchange-Public-API
```

**Set up environment variables:**<br>
Create a .env file in the root directory with the following variable (find this token after creating an account on [APYHub](https://apyhub.com/utility/currency-conversion-multiple?ref=public_apis)):
```bash
APY_TOKEN=your_apyhub_token
```

**Run Docker Compose**
```bash
docker-compose up -d
```
The server will start running on http://localhost:3000.

## API Documentation
**Explore the API endpoints using Swagger documentation:**

Open your browser and go to http://localhost:3000/api-docs

![image](https://github.com/Rofaydaaa/Currency-Exchange-Public-API/assets/125312170/b71aa8c6-68b9-4b8b-817b-d4353b3c8968)
![image](https://github.com/Rofaydaaa/Currency-Exchange-Public-API/assets/125312170/ce9612ea-1035-4e75-950a-e68fdf657d89)
![image](https://github.com/Rofaydaaa/Currency-Exchange-Public-API/assets/125312170/5286bc00-24b6-4a04-a365-e67d96099f8f)
![image](https://github.com/Rofaydaaa/Currency-Exchange-Public-API/assets/125312170/eeb45169-3503-464b-96bf-47dc336513ff)


