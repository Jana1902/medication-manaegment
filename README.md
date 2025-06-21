# Medication Management System – Frontend

This is the React frontend for the **Medication Management System**, a project designed to help **patients** track their medication schedules and **caretakers** manage their patients effectively.

---

## 🚀 Features

- User authentication (Patient / Caretaker)
- Protected dashboards for each user type
- Role-based routing
- Medication status tracking
- Real-time data fetch for:
  - Daily streaks
  - Today's medication status
  - Monthly completion percentage

---

## 🔐 Login & Registration Information

### 📝 Registration

- **Patient Registration**
  - No code required.
  - Must provide:
    - A **unique username**
    - A **password** (at least 8 characters)
    - Re-type the password to confirm
  - You’ll be redirected to login after successful registration.

- **Caretaker Registration**
  - Must enter the code: `CARETAKER980`
  - Required fields:
    - Unique username
    - Password (min 8 characters)
    - Re-typed password
    - Code field becomes visible when "Caretaker" is selected
  - Without the correct code, registration will be rejected.

### 🔐 Login

- Choose whether you're logging in as a **Patient** or **Caretaker**.
- Enter your username and password.
- On success, you'll be redirected to your respective dashboard:
  - `/patient/:id`
  - `/caretaker/:id`

> ✅ JWT Token is saved in `localStorage` to manage session state.

---

## 📂 Project Structure

```bash
src/
├── components/          
│   ├── Header/              # Top navbar with logout
│   └── ProtectedRoute/      # Route guard based on JWT token
├── pages/               
│   ├── Login.js             # Login form with role toggle
│   ├── Register.js          # Registration form
│   ├── PatientDashboardPage.js
│   └── Caretaker.js
├── App.js                   # Route declarations
└── index.js                 # App entry point
