Online Management System Documentation
This repository hosts the code for an Online Management System developed using the MERN stack (MongoDB, Express.js, React, Node.js). The system incorporates Tailwind CSS and DaisyUI for a responsive UI, uses Cloudinary for media management, and integrates Razorpay for efficient subscription-based access.

Table of Contents
Overview
System Preview
Key Features
System Requirements
Installation Guide
System Usage
Subscription Management Features
Overview
The Online Management System is designed to facilitate the delivery, management, and tracking of educational courses online. It enables administrators to set up and manage courses, and allows users to enroll in courses, consume content, and track their progress. Subscription management through Razorpay enables controlled access to courses.

System Preview
View the live version of the system: Online Management System Preview.

Key Features
User Management: Secure authentication and role-based authorization.
Course Management: Tools for creating, editing, and removing courses.
Media Handling: Integration with Cloudinary for storing and managing educational content.
Progress Tracking: Features for users to track their course progress.
Interactive Design: Built with React and styled using Tailwind CSS for a dynamic user experience.
Financial Transactions: Razorpay integration for handling subscriptions and payments.
System Requirements
Before installation, make sure the following prerequisites are met:

Node.js (version 14.x or newer)
npm (version 6.x or newer)
MongoDB (version 4.x or newer)
A Cloudinary account for image and video management
Installation Guide
Repository Cloning:


git clone https://github.com/TijuThampan/Online-Learning-Management-System
cd learning-management-system
Server Setup:


cd server
npm install
Client Setup:


cd ../client
npm install
Environment Configuration:

In the server directory, create a .env file:

PORT=5000
MONGO_URI=<your_MongoDB_URI>
JWT_SECRET=<your_JWT_secret>
CLOUDINARY_URL=<your_Cloudinary_url>
RAZORPAY_KEY_ID=<your_Razorpay_key_id>
System Usage
Start the Server:


npm run dev
Launch the Client:


npm start
Access the System:

Navigate to http://localhost:5173 in your web browser.
Subscription Management Features
The system includes an advanced subscription management system that allows:

Plan Browsing: Users can explore various subscription plans.
Subscription Enrollment: Users can subscribe to plans via Razorpay to gain access to premium content.
Subscription Cancellation: Users can cancel their subscriptions at any time through their account settings.