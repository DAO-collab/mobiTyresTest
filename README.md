
<h2>VueLaravelApp</h2>
This readme file provides instructions on setting up and running the project.

### Frontend
The frontend of the application is located in the frontend directory. Follow these steps to run the frontend app:

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

## Environment Configuration
Ensure you have a valid .env file with appropriate configurations. Here's an example .env file:
```
dotenv

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

### Laravel Server
To run the Laravel server, execute the following command:



```
php artisan serve
```

This will start the server, and you can access your application on the specified APP_URL.

Happy coding!