# Video Streaming App Backend

A robust and scalable Node.js backend application for video streaming with comprehensive user management, video operations, and social features.

## 🚀 Features

### Core Functionality
- **Video Management**: Upload, delete, and retrieve videos with metadata
- **User Authentication**: JWT-based authentication with access and refresh tokens
- **Social Features**: Like and comment system for videos
- **Media Processing**: Seamless video and image upload handling
- **Scalable Architecture**: RESTful API design for optimal performance

### Technical Highlights
- **Secure Sessions**: JWT token-based authentication with automatic token renewal
- **File Upload**: Multer v1.4 integration for efficient media file processing
- **Database Aggregation**: Advanced MongoDB aggregation pipelines for complex queries
- **RESTful APIs**: Well-structured endpoints following REST principles

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB 7.0
- **Authentication**: JWT (Access & Refresh Tokens)
- **File Upload**: Multer v1.4
- **API Testing**: Postman

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB 7.0
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd video-streaming-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/video-streaming
   JWT_ACCESS_SECRET=your_jwt_access_secret_key
   JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
   JWT_ACCESS_EXPIRY=15m
   JWT_REFRESH_EXPIRY=7d
   ```

4. **Start MongoDB**
   Make sure your MongoDB service is running on your system.

5. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```
