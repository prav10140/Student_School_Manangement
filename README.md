---

## 🚀 Installation & Setup Guide

### Step 1: Database Setup
1.  Open your SQL management tool (e.g., **phpMyAdmin** or **MySQL Workbench**).
2.  Create a new database named `SchoolDB`.
3.  Run the following SQL script to create the required tables:


Step 2: Backend Setup
Open your project folder in the terminal (Command Prompt/PowerShell).

Initialize the project and install the required packages:

Bash
npm init -y
npm install express mysql2 cors body-parser
Open the file server.js and check the Database Connection settings. If you use a password for MySQL, update it here:

JavaScript
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Your MySQL username
    password: '',      // Your MySQL password (leave empty for XAMPP default)
    database: 'SchoolDB'
});
Step 3: Run the Server
In your terminal, start the backend server:

Bash
node server.js
You should see the message: 🚀 Server running on port 3000 and ✅ Connected to MySQL Database.

Step 4: Run the Frontend
Locate the index.html file in your project folder.

Double-click it to open it in your web browser (Chrome, Edge, etc.).
