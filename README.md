# Capstone Project: Restaurant Application 

The Restaurant Application is a full-stack web application developed as part of the MIT MERN Full Stack coding certification. It aims to provide users with a seamless experience for browsing and ordering food items from a restaurant's menu.

This App caters to both end-users and administrators. End-users can browse the menu, add items to their carts, and place orders. Administrators have additional privileges, including managing the menu by adding, updating, and deleting food items, as well as viewing order history for better business insights.

Project deployment:
https://gemmafong-fullstackrestaurantapplication-smoltypo.vercel.app


<img src="https://github.com/smolTypo/restaurant-app/blob/main/RestaurantApp.png"/>

## The application is built using the following technologies:

-  Front-end architecture: Next.js
-  Authentication: JWT (JSON Web Tokens)
-  Database: PostgreSQL
-  API: Strapi (Headless CMS)
-  Deployment: Vercel (Front-end), Render (Back-end)

## Features

-  User authentication: Users can create an account, log in, and log out. Authentication is implemented using JWT for secure and persistent user sessions.
-  Menu browsing: Users can view the restaurant menu, including food item details such as name, description, and price.
-  Cart management: Users can add items to their cart, modify quantities, and remove items.
-  Order placement: Users can place an order and receive a confirmation with order details.
-  Admin functionality: Admin users have additional privileges, such as managing the menu (adding, updating, and deleting food items) and viewing order history.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- Strapi CMS (installed and configured)
  
### Installation
1. Clone the repository.

2. Install the dependencies for the front-end and back-end.

3. Configure environment variables:
   
  - Front-end: Create a .env.local file in the frontend directory and provide the following variables:
     
     NEXT_PUBLIC_API_URL=your-api-url
    
  - Back-end: Create a .env file in the backend directory and configure the following variables:
    
    DATABASE_URL=your-postgres-connection-string
    
    JWT_SECRET=your-jwt-secret

4. Start the development servers:
 
  #### Start the front-end server
    cd frontend
    npm run dev

  #### Start the back-end server
    cd backend
    npm run develop

5. Access the application in your browser at http://localhost:3000.

## Deployment

This application can be deployed using the following platforms:

- Front-end (Client): Vercel
  - Create a new project on Vercel and connect it to your GitHub repository.
  - Configure the necessary environment variables in the Vercel project settings, including NEXT_PUBLIC_API_URL.
  - Vercel will automatically deploy the application whenever changes are pushed to the main branch.
    
- Back-end (Server): Render
  - Create a new web service on Render and connect it to your GitHub repository.
  - Configure the necessary environment variables in the Render web service settings, including DATABASE_URL and JWT_SECRET.
  - Render will automatically deploy the back-end server whenever changes are pushed to the main branch.
  - Ensure that the respective environment variables are set correctly in the deployment platforms.


## License

This project is licensed under the <a href="https://github.com/smolTypo/restaurant-app/blob/main/LICENSE">MIT License.</a>
