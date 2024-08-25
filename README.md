# Product Management System

This project is a product management system built with React and Node.js, integrated with WordPress WooCommerce. It allows users to search, filter, and update WooCommerce product information.

## Features

- Search WooCommerce products by keyword
- Filter WooCommerce products by short description
- Edit WooCommerce product details
- Update WooCommerce product information

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/product-management-system.git
   ```

2. Navigate to the project directory:

   ```bash
   cd product-management-system
   ```

3. Install dependencies for the frontend:

   ```bash
   cd frontend
   npm install
   ```

4. Install dependencies for the backend:
   ```bash
   cd ../backend
   npm install
   ```

## Configuration

1. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```plaintext
   REACT_APP_API_BASE_URL=https://your-wordpress-site.com
   REACT_APP_CONSUMER_KEY=your-woocommerce-consumer-key
   REACT_APP_CONSUMER_SECRET=your-woocommerce-consumer-secret
   ```

## Usage

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:

   ```bash
   cd ../frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and commit them:

   ```bash
   git commit -m 'Add some feature'
   ```

4. Push to the branch:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a pull request.

## License

This project is licensed under the MIT License.
