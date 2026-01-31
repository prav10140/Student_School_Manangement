const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 1. DATABASE CONNECTION
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: 'APNA PASSWORD USE KARO',      
    database: 'SchoolDB'
});

db.connect(err => {
    if (err) console.error('❌ DB Error: ' + err.message);
    else console.log('✅ Connected to MySQL Database');
});

// 2. API ENDPOINTS

// === 🎓 STUDENTS ===
app.get('/api/students', (req, res) => {
    const sql = `SELECT s.*, c.class_name FROM Students s LEFT JOIN Classes c ON s.class_id = c.class_id`;
    db.query(sql, (err, result) => {
        if(err) return res.status(500).json(err);
        res.json(result);
    });
});

app.post('/api/students', (req, res) => {
    const { first_name, last_name, dob, class_id, contact_number } = req.body;
    const sql = `INSERT INTO Students (first_name, last_name, dob, class_id, contact_number, admission_date) VALUES (?, ?, ?, ?, ?, CURDATE())`;
    db.query(sql, [first_name, last_name, dob, class_id, contact_number], (err, result) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ message: "Student Added" });
    });
});

app.delete('/api/students/:id', (req, res) => {
    db.query("DELETE FROM Students WHERE student_id = ?", [req.params.id], (err, result) => {
        if(err) return res.status(500).json(err);
        res.json({ message: "Deleted" });
    });
});

// === 👩‍🏫 TEACHERS ===
app.get('/api/teachers', (req, res) => {
    db.query("SELECT * FROM Teachers", (err, result) => {
        if(err) return res.status(500).json(err);
        res.json(result);
    });
});

app.post('/api/teachers', (req, res) => {
    const { first_name, last_name, subject, email, phone } = req.body;
    const sql = "INSERT INTO Teachers (first_name, last_name, subject_specialization, email, phone) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [first_name, last_name, subject, email, phone], (err, result) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ message: "Teacher Added" });
    });
});

// === 🏫 CLASSES (New) ===
app.get('/api/classes', (req, res) => {
    // Join with Teachers to show the teacher's name
    const sql = "SELECT c.*, t.first_name as teacher_name FROM Classes c LEFT JOIN Teachers t ON c.teacher_id = t.teacher_id";
    db.query(sql, (err, result) => {
        if(err) return res.status(500).json(err);
        res.json(result);
    });
});

app.post('/api/classes', (req, res) => {
    const { class_name, teacher_id } = req.body;
    const sql = "INSERT INTO Classes (class_name, teacher_id) VALUES (?, ?)";
    db.query(sql, [class_name, teacher_id], (err, result) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ message: "Class Created" });
    });
});

// === 📅 ATTENDANCE (New) ===
app.get('/api/attendance', (req, res) => {
    const sql = `SELECT a.*, s.first_name, s.last_name FROM Attendance a JOIN Students s ON a.student_id = s.student_id ORDER BY a.date DESC`;
    db.query(sql, (err, result) => {
        if(err) return res.status(500).json(err);
        res.json(result);
    });
});

app.post('/api/attendance', (req, res) => {
    const { student_id, date, status } = req.body;
    const sql = "INSERT INTO Attendance (student_id, date, status) VALUES (?, ?, ?)";
    db.query(sql, [student_id, date, status], (err, result) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ message: "Attendance Marked" });
    });
});

// === 💰 FEES (New) ===
app.get('/api/fees', (req, res) => {
    const sql = `SELECT f.*, s.first_name, s.last_name FROM Fees f JOIN Students s ON f.student_id = s.student_id`;
    db.query(sql, (err, result) => {
        if(err) return res.status(500).json(err);
        res.json(result);
    });
});

app.post('/api/fees', (req, res) => {
    const { student_id, amount, status, due_date } = req.body;
    const sql = "INSERT INTO Fees (student_id, amount, status, due_date) VALUES (?, ?, ?, ?)";
    db.query(sql, [student_id, amount, status, due_date], (err, result) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ message: "Fee Record Added" });
    });
});

// 3. START SERVER
app.listen(3000, () => {
    console.log("🚀 Server running on port 3000");
});