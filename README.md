# E-Commerce Website

This is a fully functional and responsive **E-Commerce Website** built with modern technologies such as React, Vite, MongoDB, and Kafka. The project includes features like user authentication, product CRUD operations, filtering, and dynamic product rendering. 

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **User Authentication**: Login and registration functionality.
- **CRUD Operations**: Manage products through Create, Read, Update, and Delete operations.
- **Dynamic Filtering**: Filter products by category, price, and other criteria.
- **Responsive Design**: Mobile-first approach ensuring compatibility across all devices.
- **Stylish UI**: Enhanced with Bootstrap, Font Awesome, and styled-components.
- **Real-Time Data Streaming**: Powered by Kafka for seamless data communication.
- **State Management**: Utilizes React's `useState` and `useEffect` hooks for dynamic content.

---

## Technologies Used
### Frontend
- **React** (v18.3.1): Library for building user interfaces.
- **Vite**: Fast and optimized build tool.
- **React Router DOM** (v7.0.2): Routing for React applications.
- **Axios** (v1.7.9): HTTP client for API calls.
- **React Slick**: Carousel component for dynamic content.
- **Swiper**: Modern mobile-friendly slider.
- **Styled Components** (v6.1.13): CSS-in-JS for styled elements.

### Backend
- **Node.js**: JavaScript runtime for server-side logic.
- **MongoDB**: NoSQL database for data persistence.
- **Kafka**: Event streaming platform for real-time data processing.

### Additional Tools
- **Bootstrap** (v4.6.2): CSS framework for responsive design.
- **Font Awesome** (v4.7.0): Icon toolkit for UI elements.
- **js-cookie** (v3.0.5): Cookie handling for user sessions.

---

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB
- Kafka (set up locally or via a cloud service)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
2.
    ```bash
    docker-compose up -d --build


### Screens
![home1](https://github.com/user-attachments/assets/0f06db8c-ffdb-4b8f-8f72-e10b6a6766ac)
![productdete](https://github.com/user-attachments/assets/eed546f6-5faf-41e9-b1f0-bf71f84588cd)
![homes](https://github.com/user-attachments/assets/8c894833-cd79-4088-b1be-8ff3b7952d09)
![prolist](https://github.com/user-attachments/assets/7a5c4869-08d8-4147-b65f-212189d0e83f)
![footer](https://github.com/user-attachments/assets/530496bc-79e5-42a7-92c5-d991f41dcd7d)

# MongoDB configuration
| Variable                     | Description                                | Example Value                                                                                           |
|------------------------------|--------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `PORT`                       | The port the server will run on            | `4000`                                                                                                  |
| `CONNECTION_STRING`          | MongoDB connection string                 | `"mongodb+srv://<username>:<password>@newmind.pv5co.mongodb.net/eShopDataBase?retryWrites=true&w=majority&appName=newmind"` |
| `cloudinary_cloud_name`      | Your Cloudinary cloud name                | `"eShopimg"`                                                                                           |
| `cloudinary_api_key`         | Your Cloudinary API key                   | `"265588333525137"`                                                                                     |
| `cloudinary_api_secret`      | Your Cloudinary API secret                | `"Rhf2txLSJsJkaL3dLJiXHvPmkWI"`                                                                         |
| `JSON_WEB_TOKEN_SECRET_KEY`  | Secret key for JWT generation and verification | `"kalma9378"`                                                                                         |
