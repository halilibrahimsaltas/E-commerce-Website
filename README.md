# E-Commerce Microservices Project

A modern e-commerce platform built with a hybrid architecture - combining a monolithic core with strategic microservices. The project features a robust product management system, user authentication, payment processing, and real-time event handling using Kafka.

## Architecture Overview

- **Monolithic Core**: Main application handling product management and user operations
- **Payment Microservice**: Independent service for payment processing
- **Event-Driven Communication**: Kafka for inter-service messaging
- **Caching Layer**: Redis for session management and caching
- **Database**: MongoDB for persistent storage

## Technologies Used

### Core Technologies

- **Node.js & Express.js**: Backend framework
- **React & Vite**: Frontend development
- **MongoDB**: Primary database
- **Redis**: Caching and session management
- **Kafka**: Event streaming and inter-service communication
- **Docker**: Containerization

### Frontend Stack

- React 18.3.1
- Material-UI 6.2.0
- React Router DOM 7.0.2
- Bootstrap 4.6.2
- Styled Components 6.1.13

### Backend Stack

- Express.js
- Mongoose
- KafkaJS
- Redis Client
- JWT Authentication

## Key Features

### Product Management

- Product listing with dynamic filtering
- Category management
- Price filtering
- Product search
- Responsive product grid

### User Operations

- User authentication
- Session management with Redis
- Profile management
- Shopping cart functionality

### Payment Processing

- Dedicated payment microservice
- Secure payment handling
- Payment status tracking
- Event-driven payment notifications

### System Integration

- Kafka event streaming
- Inter-service communication
- Real-time updates
- Distributed system architecture

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js
- MongoDB
- Redis
- Kafka

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/e-commerce-microservices.git
cd e-commerce-microservices
```

2. Create necessary .env files:
   For root directory (.env):

```bash
MONGODB_URI=your_mongodb_connection_string
REDIS_URL=redis://redis:6379
```

For server/.env:

```bash
ORT=4000
CONNECTION_STRING=your_mongodb_connection_string
REDIS_URL=redis://redis:6379
KAFKA_BROKERS=kafka:29092
JSON_WEB_TOKEN_SECRET_KEY=your_jwt_secret
```

For payment-service/.env:

```bash
PORT=3001
CONNECTION_STRING=your_mongodb_connection_string
KAFKA_BROKERS=kafka:29092
```

3. Start the services:

```bash
docker-compose up -d --build
```

4. Rebuild specific service:

```bash
docker-compose up -d --build client
```

5. Stop services:

```bash
docker-compose down
```
### Screens
![home1](https://github.com/user-attachments/assets/0f06db8c-ffdb-4b8f-8f72-e10b6a6766ac)
![productdete](https://github.com/user-attachments/assets/eed546f6-5faf-41e9-b1f0-bf71f84588cd)
![Image](https://github.com/user-attachments/assets/a7c46c4a-7cd5-4e2a-a00b-fefe0f9dc6aa)
![homes](https://github.com/user-attachments/assets/8c894833-cd79-4088-b1be-8ff3b7952d09)
![prolist](https://github.com/user-attachments/assets/7a5c4869-08d8-4147-b65f-212189d0e83f)
![Image](https://github.com/user-attachments/assets/408a056b-3985-4088-9f60-5dd9ffbf6b0b)
![footer](https://github.com/user-attachments/assets/530496bc-79e5-42a7-92c5-d991f41dcd7d)
![Image](https://github.com/user-attachments/assets/8eef1fdf-7a78-487c-91fa-4e894c47ba07)
# MongoDB configuration
| Variable                     | Description                                | Example Value                                                                                           |
|------------------------------|--------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `PORT`                       | The port the server will run on            | `4000`                                                                                                  |
| `CONNECTION_STRING`          | MongoDB connection string                 | `"mongodb+srv://<username>:<password>@newmind.pv5co.mongodb.net/eShopDataBase?retryWrites=true&w=majority&appName=newmind"` |
| `cloudinary_cloud_name`      | Your Cloudinary cloud name                | `"eShopimg"`                                                                                           |
| `cloudinary_api_key`         | Your Cloudinary API key                   | `"265588333525137"`                                                                                     |
| `cloudinary_api_secret`      | Your Cloudinary API secret                | `"Rhf2txLSJsJkaL3dLJiXHvPmkWI"`                                                                         |
| `JSON_WEB_TOKEN_SECRET_KEY`  | Secret key for JWT generation and verification | `"kalma9378"`                                                                                         |
