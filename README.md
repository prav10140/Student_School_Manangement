# 🏫 School Management System (SMS)

A full-stack web application designed to streamline school administration. This system enables administrators to manage student records, teacher profiles, class schedules, daily attendance, and fee collections through a modern, responsive dashboard connected to a relational MySQL database.

## ✨ Project Features

* **📊 Interactive Dashboard:** View real-time counters for Total Students, Teachers, and Active Classes.
* **👨‍🎓 Student Management:** Enroll students with personal details (DOB, Contact) and assign them to classes.
* **👩‍🏫 Teacher Management:** Register teachers with subject specializations and contact info.
* **🏫 Class Management:** Create classes and assign specific teachers to them (Foreign Key Integration).
* **📅 Attendance System:** Mark students as Present, Absent, or Late for specific dates.
* **💰 Fee Tracking:** Record fee payments, track due dates, and monitor payment status (Paid/Pending/Overdue).
* **💾 Database Driven:** All data is persistently stored in a MySQL relational database.

---

## 🛠️ Technology Stack

* **Frontend:** HTML5, CSS3 (Modern variables & Flexbox), JavaScript (Fetch API).
* **Backend:** Node.js, Express.js.
* **Database:** MySQL.
* **Dependencies:** `express`, `mysql2`, `cors`, `body-parser`.

---

## ⚙️ Prerequisites

Before running the project, ensure you have the following installed:
1.  **Node.js** (v14 or higher) - [Download Node.js](https://nodejs.org/)
2.  **MySQL Server** (via **XAMPP**, **WAMP**, or MySQL Workbench).

---

## 🚀 Installation & Setup Guide

### Step 1: Database Setup
1.  Open your SQL management tool (e.g., **phpMyAdmin** or **MySQL Workbench**).
2.  Create a new database named `SchoolDB`.
3.  Run the following SQL script to create the required tables:

```sql
USE SchoolDB;

-- 1. Teachers
CREATE TABLE IF NOT EXISTS Teachers (
    teacher_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    subject_specialization VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(15)
);

-- 2. Classes
CREATE TABLE IF NOT EXISTS Classes (
    class_id INT PRIMARY KEY AUTO_INCREMENT,
    class_name VARCHAR(50),
    teacher_id INT,
    FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id) ON DELETE SET NULL
);

-- 3. Students
CREATE TABLE IF NOT EXISTS Students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    dob DATE,
    class_id INT,
    contact_number VARCHAR(15),
    admission_date DATE,
    FOREIGN KEY (class_id) REFERENCES Classes(class_id) ON DELETE SET NULL
);

-- 4. Attendance
CREATE TABLE IF NOT EXISTS Attendance (
    attendance_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    date DATE,
    status ENUM('Present', 'Absent', 'Late'),
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE
);

-- 5. Fees
CREATE TABLE IF NOT EXISTS Fees (
    fee_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    amount DECIMAL(10,2),
    status ENUM('Paid', 'Pending', 'Overdue'),
    due_date DATE,
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE
);
```
---

## Step 2: Backend Setup
Open your project folder in the terminal (Command Prompt or PowerShell).

Initialize the project and install the required packages:

```sql
npm init -y
npm install express mysql2 cors body-parser
```

Open the file server.js and check the Database Connection settings. If you use a password for MySQL, update it here:

# JavaScript
```sql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Your MySQL username
    password: '',      // Your MySQL password (leave empty for XAMPP default)
    database: 'SchoolDB'
});
```
## Step 3: Run the Server
In your terminal, start the backend server:

```sql
node server.js
```
Success Message: You should see 🚀 Server running on port 3000 and ✅ Connected to MySQL Database.

## Step 4: Run the Frontend
Locate the index.html file in your project folder. Double-click it to open it in your web browser (Chrome, Edge, etc.).
