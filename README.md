# Currency Exchange API

## Overview
The Currency Exchange API is a RESTful service designed to facilitate currency conversion using the [APYHub](https://apyhub.com/utility/currency-conversion-multiple?ref=public_apis) platform. It allows users to convert currencies easily by specifying a source currency and a list of target currencies.

## Features

- **Convert Currency**: Convert from a specified source currency to multiple target currencies.
- **Authentication**: Secure endpoints that require authentication using a bearer token.
- **Error Handling**: Robust error handling for invalid requests and authentication failures.

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

### With Docker Installation
**Clone the repository:**

```bash
git clone https://github.com/Rofaydaaa/Currency-Exchange-Public-API.git
cd Currency-Exchange-Public-API
```

## API Documentation
**Explore the API endpoints using Swagger documentation:**

Open your browser and go to http://localhost:3000/api-docs

![image](https://github.com/Rofaydaaa/Currency-Exchange-Public-API/assets/125312170/b71aa8c6-68b9-4b8b-817b-d4353b3c8968)
![image](https://github.com/Rofaydaaa/Currency-Exchange-Public-API/assets/125312170/ce9612ea-1035-4e75-950a-e68fdf657d89)
![image](https://github.com/Rofaydaaa/Currency-Exchange-Public-API/assets/125312170/5286bc00-24b6-4a04-a365-e67d96099f8f)
![image](https://github.com/Rofaydaaa/Currency-Exchange-Public-API/assets/125312170/eeb45169-3503-464b-96bf-47dc336513ff)


