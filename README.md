# Veroca
Order Management System

# Usage
Log in to your account (Register if no account yet), and manage your customer's tomorrow's order!

## To run this project:
1. Clone this repository `git clone https://github.com/khianvictorycalderon/Veroca.git`
2. Install postgresql server (if you don't have it yet)
3. Run the following postgresql query in your local postgresql:
    ```sql
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        username TEXT NOT NULL UNIQUE,
        birth_date DATE NOT NULL,
        password TEXT NOT NULL
    );
    ```
4. Create `.env.local` that contains the following:
    ```env
    DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<database_name>
    ```
    and replace the DATABASE_URL with you actual database configurations
5. Run `npm install`
6. Run `npm run dev`

---

## Tech Stacks
- Next.js
- Tailwind CSS
- PostgreSQL

## Dependencies & Configuration
The following is a list of installed dependencies and configuration settings used in this project.
You don’t need to install anything manually, as all dependencies are already managed through `package.json`.
This section is provided for reference only, to give you insight into how the project was set up.

## Dependencies
- `npm install pg`
- `npm install --save-dev @types/pg`
- `npm install axios`
- `npm install react-icons`
- `npm install react-hook-form`
- `npm install dotenv`
- `npm install zod`
- `npm install bcrypt`