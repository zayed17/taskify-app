# Task and Feed Management Application

## Overview
A full-stack web application for managing tasks and feeds with user authentication, built using React, Node.js, Express, and MongoDB.

## Features
### Authentication
- User login
- User signup
- Password reset functionality

### Task Management
- Create tasks
- View tasks
- Update task status
- Delete tasks

### Feed Management
- Create feeds with images and captions
- View feeds
- Delete feeds

## Technology Stack
### Frontend
- React
- React Router
- Ant Design
- RTK Query

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- Cloudinary (for image storage)

## Prerequisites
- Node.js (v20+)
- MongoDB
- Cloudinary Account

## Installation

### Backend Setup
1. Clone the repository
```bash
git clone https://github.com/zayed17/taskify-app.git
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file with:
```
Message me
```

4. Start the backend server
```bash
npm start
```

### Frontend Setup
1. Navigate to frontend directory
```bash
cd ../client
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file with:
```
VITE_API_BASE_URL=http://localhost:5000
```

4. Start frontend development server
```bash
npm run dev
```

5. Open browser to `http://localhost:5173`

## Project Structure
### Backend
```
server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── app.ts
```

### Frontend
```
client/
├── src/
│   ├── api/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── utils/
│   └── App.tsx
```

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

