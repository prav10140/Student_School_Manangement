1. Create Database
CREATE DATABASE SchoolDB;
USE SchoolDB;

2. Teachers Table
CREATE TABLE Teachers (
    teacher_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    subject_specialization VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15)
);

-- 3. Classes Table
CREATE TABLE Classes (
    class_id INT PRIMARY KEY AUTO_INCREMENT,
    class_name VARCHAR(20), -- e.g., 'Grade 10-A'
    teacher_id INT,
    FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id)
);

-- 4. Students Table
CREATE TABLE Students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    dob DATE,
    class_id INT,
    contact_number VARCHAR(15),
    admission_date DATE,
    FOREIGN KEY (class_id) REFERENCES Classes(class_id)
);

-- 5. Fees Table
CREATE TABLE Fees (
    fee_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    amount DECIMAL(10,2),
    status ENUM('Paid', 'Pending', 'Overdue'),
    due_date DATE,
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
);

-- 6. Attendance Table
CREATE TABLE Attendance (
    attendance_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    date DATE,
    status ENUM('Present', 'Absent', 'Late'),
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
);

Insert a dummy Teacher so we can make a Class
INSERT INTO Teachers (first_name, last_name, subject_specialization, email, phone) 
VALUES ('John', 'Doe', 'Math', 'john@school.com', '1234567890');

-- Insert a dummy Class (ID 1)
INSERT INTO Classes (class_name, teacher_id) 
VALUES ('Grade 10-A', 1);


SELECT * FROM students;