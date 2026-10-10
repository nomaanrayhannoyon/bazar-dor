
# 🛒 বাজার দর | BazarDor

### বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে

BazarDor is a daily essentials price-tracking web application designed to help users explore product prices, compare market rates, and monitor daily price increases and decreases across Bangladesh.

The application provides an easy-to-use interface where users can browse products, filter them by category, view product details, and access personalized features through authentication.

## ✨ Features

- **Live Price Overview:** Browse product prices and daily price changes.
- **Price Increase & Decrease:** View products with rising and falling prices.
- **Product Categories:** Filter products by category.
- **Product Details:** Explore individual product information and market prices.
- **User Authentication:** Sign in and sign up using Better Auth.
- **Social Login:** Support for Google and GitHub authentication.
- **Protected Routes:** Restrict selected pages to authenticated users.
- **Responsive Design:** Optimized for mobile, tablet, and desktop devices.
- **Loading States:** Display loading indicators while product data is being fetched.
- **User Profile:** View and update profile information.
- **Toast Notifications:** Display feedback for authentication and other user actions.

## 🛠️ Technologies Used

- **Next.js** — React framework and App Router
- **React** — User interface development
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling and responsive layouts
- **Better Auth** — Authentication and social login
- **React Hot Toast** — Toast notifications
- **REST API** — Product and category data
- **Git & GitHub** — Version control and source code management
- **Vercel** — Deployment

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your computer.

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project directory:

   ```bash
   cd YOUR_PROJECT_FOLDER
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure the required environment variables in a `.env.local` file according to your Better Auth and database configuration.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Authentication

BazarDor uses Better Auth for email and password authentication, with Google and GitHub social login support.

Make sure the required authentication providers, environment variables, and database configuration are set up before running the application.

## 🌐 Deployment



Configure the required environment variables in the deployment settings and ensure that authentication callback URLs are configured correctly.

## 📁 Project Information

- **Project Name:** BazarDor (বাজার দর)
- **Project Type:** Daily Essentials Price Tracking Web Application
- **Framework:** Next.js
- **Authentication:** Better Auth

## 👨‍💻 Author

Developed as part of a web development assignment.

## 📄 License

This project was created for educational purposes.
