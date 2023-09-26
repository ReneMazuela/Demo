# TruData ChatBot v0.04

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## About

The ChatBot: a cutting-edge solution, providing users with the ability to ask questions within a strictly defined context, thereby ensuring more accurate, pertinent, and intelligent responses.

![Architecture](documents/TruData.png)

## Getting Started

These instructions will help you set up and run the project locally.

### Prerequisites

Before you begin, ensure you have met the following requirements:

**FastAPI Service:**
- [Docker](https://www.docker.com/get-started): Required for containerization.
- [Python](https://www.python.org/downloads/): Version 3.6 or higher is needed.
- [FastAPI](https://fastapi.tiangolo.com/): You can install it via `pip install fastapi`.
- [Uvicorn](https://www.uvicorn.org/): You can install it via `pip install uvicorn`.

**React Service:**

- [Node.js](https://nodejs.org) (version 9.5.1)
- [npm](https://www.npmjs.com) or [Yarn](https://yarnpkg.com) 

These prerequisites are essential to get started with the project. Follow the installation guides linked above to set up the necessary tools and frameworks.

### Installation

**Clone the repository & cd into the Trudata directory**:

   ```bash
   git clone https://github.com/triveradev/trudata.git
   cd trudata
   ```

**Build and run the Docker containers for bot FastAPI and React**:

   ```bash
   docker compose up
   ```


## Usage

Once the server is running, you can access the FastAPI documentation and test the endpoints by navigating to:

```
http://localhost:8000/docs
```

Explore and test the API endpoints through this interactive interface or access the API directly through HTTP clients like [Postman](https://www.postman.com/) or `curl` commands.

To access the react front-end on your local machine once you have built you containers you can do so using the link below.

```➜  Local:   http://localhost:8080/
```


## API Endpoints

### General API Information

- Base URL: `http://localhost:8000/docs`
- All endpoints return JSON objects

### Endpoints

#### GET /items

- Description: Retrieve a resource from the mongoDB.
- Parameters: /resource/{_id} (required)
- Response:

  ```curl
  curl -X 'GET' \
  'http://localhost:8000/resource/64b0c351636066c63e1aedc4' \
  -H 'accept: application/json'
  ```

#### POST /items

- Description: Query an Input.
- Parameters:
  - `name`: /query (required)
- Request Body:

  ```json
  {
  "input_text": "string"
   }
  ```
  
  ```curl
  curl -X 'POST' \
  'http://localhost:8000/query' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "input_text": "what is python"
  ```
}'

- Response:

  ```json
  {
  "response": "Python is an open-source, all-purpose programming language that was created by Guido van Rossum. It is an interpreted language, meaning that the Python interpreter reads and interprets Python commands on-the-fly. Python has clear and readable syntax and supports multiple programming paradigms, including object-oriented programming, procedural programming, and functional programming. It also has dynamic data structures, exception-based error handling, and the ability to organize code into modules and packages. Python has an extensive standard library and supports third-party modules.",
  "sources": [
    {
      "chunk": 0,
      "id": "f1aa0e2f-6d78-463d-b82d-f0ea2beb7e71",
      "tru_pagelabel": 268,
      "tru_resource_id": "64b0c351636066c63e1aedc4",
      "tru_resource_name": "Guide_TTPS4800_IntroPython_230612.pdf",
      "tru_type": "application/pdf"
    },
    {
      "chunk": 0,
      "id": "ea676012-7c81-4be3-bfe0-2b01963d8d93",
      "tru_pagelabel": 272,
      "tru_resource_id": "64b0c351636066c63e1aedc4",
      "tru_resource_name": "Guide_TTPS4800_IntroPython_230612.pdf",
      "tru_type": "application/pdf"
    },
    {
      "chunk": 0,
      "id": "18ef1f2c-11ae-4f73-9de3-4211d1f8a343",
      "tru_pagelabel": 273,
      "tru_resource_id": "64b0c351636066c63e1aedc4",
      "tru_resource_name": "Guide_TTPS4800_IntroPython_230612.pdf",
      "tru_type": "application/pdf"
    },
    {
      "chunk": 0,
      "id": "072ffc8f-9355-4cbe-87dd-f609b5bef035",
      "tru_pagelabel": 271,
      "tru_resource_id": "64b0c351636066c63e1aedc4",
      "tru_resource_name": "Guide_TTPS4800_IntroPython_230612.pdf",
      "tru_type": "application/pdf"
    },
    {
      "chunk": 0,
      "id": "231dd88b-1e33-4364-8782-4744e5305e4e",
      "tru_pagelabel": 22,
      "tru_resource_id": "64b0c351636066c63e1aedc4",
      "tru_resource_name": "Guide_TTPS4800_IntroPython_230612.pdf",
      "tru_type": "application/pdf"
    }
  ]
   }
  ```

## License

.
