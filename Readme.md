# Altmetrics code challange

## Backend
Built with NestJS

* Models
    * User (id, email, password, name)
    * Invoice (id, vendor_name, amount, due_date, created_at, user_id, paid)

**No tests at the moment**

## Frontend
Built with React

* Routes
    * Invoices (implemented)
    * Bills (not implemented)
    * Expenses (not implemented)
    * Reports (not implemented)

## Usage
1. Install `docker-compose` or use built in `docker compose` command
2. Run `docker compose up --build` and wait for the images to be built
4. Check containers `dokcer ps`
5. Go to `localhost:5173`
