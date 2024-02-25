
<h2>VueLaravelApp</h2>
This readme file provides instructions on setting up and running the project.
The project is split into two => The backend/server (laravel) and frontend (VueJS)

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- [PHP] (>= 7.x)
- [Composer]
- [Node.js]
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)


## BACKEND

### Installation

1. **Clone the repository:**

    ```bash
    git clone 
    cd mobiTyresTest
    ```

2. **Install Composer Dependencies:**

    ```bash
    composer install
    ```

3. **Create a Copy of the .env File:**

    ```bash
    cp .env.example .env
    ```
    Update the `.env` file with your configuration.
    ```
    .env

    APP_NAME=Laravel
    APP_ENV=local
    APP_KEY=
    APP_DEBUG=true
    APP_URL=http://localhost
    FRONTEND_URL=http://localhost:5173
    SESSION_DOMAIN=localhost
    SANCTUM_STATEFUL_DOMAINS=localhost:5173

    # ... (other configurations)
    ```

    The critical configurations to update are:

    ```
    DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD for database connection details.
    FRONTEND_URL, SESSION_DOMAIN, SANCTUM_STATEFUL_DOMAINS for frontend-related URLs.
    ```
    The rest of the configurations can be left as is unless necessary.

4. **Generate Application Key:**

    ```bash
    php artisan key:generate
    ```

5. **Database Migration:**

    ```bash
    php artisan migrate
    ```

6. **Install npm Dependencies and Build Assets:**

    ```bash
    npm install
    # or
    yarn
    # then
    npm run dev
    ```

7. **Run the Application:**

    ```bash
    php artisan serve
    ```

Visit `http://localhost:8000` in your browser.

### FRONTEND
The frontend of the application is located in the /frontend directory. Follow these steps to run the frontend app:

Navigate to the frontend directory in your terminal.
Run the following commands:

```
npm install
npm run dev
```
If you want to prepare the frontend for production, you can use:

```
npm run build
```
After building, you can open the app on the specified port.

Happy coding!