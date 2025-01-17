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
