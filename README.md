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
git clone <repository-url>
cd currency-exchange-api
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
git clone <repository-url>
cd currency-exchange-api
```

## API Documentation
**Explore the API endpoints using Swagger documentation:**

Open your browser and go to http://localhost:3000/api-docs