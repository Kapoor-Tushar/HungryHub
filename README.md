# HungryHub
This is a web application for ordering food online. Users can browse through available menu items, add them to their cart, and place orders securely.

## Features

- **User Authentication:** Secure authentication system allows users to sign up, log in, and manage their accounts.
- **Shopping Cart Management:** Users can add items to their shopping carts, modify quantities, and remove items as needed.
- **Order Processing:** Seamless order processing allows users to review their orders, provide delivery details, and make payments.
- **Payment Integration:** Integrated with Stripe for secure payment processing, supporting various payment methods.
- **Middleware:** Implemented middleware functions, such as isLoggedIn, to handle user authentication and authorization within your Express.js application.

## Technology Stack

- **Frontend:** HTML, CSS, JavaScript (with EJS for templating)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Payment Processing:** Stripe API

## Prerequisites & Installation Instructions
<ul>
  <li><strong>Clone the Repository:</strong> git clone https://github.com/Kapoor-Tushar/HungryHub.git</li>
  <li><strong>Installation of packages:</strong> First install node on your computer and then install all the dependencies present in package.json file. </li>
  <li><strong>Setting up Database(MongoDB):</strong> Create a account of mongoDB atlas, then create a cluster and then connect your cluste with the app by adding the connection string in the DATABASE field in config file.</li>
  <li><strong>Run the Application:</strong> After successful installation of packages and mongoDB set up run the server in VSCode with the help of the command nodemon server.js and then go to the local host at port number 9000 in your web browser.</li>
</ul>

