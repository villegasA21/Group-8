import express from "express";

let students = [];

const app = express();

// Middleware to read JSON data
app.use(express.json());


// GET - Get all students
app.get("/students", (req, res) => {
    res.send(students);
});


// POST - Add a student
app.post("/students", (req, res) => {
    const newStudent = req.body;

    students = [...students, newStudent];

    res.send(newStudent);
});


// PATCH - Update a student
app.patch("/students/:index", (req, res) => {
    const index = Number(req.params.index);
    const updateStudentData = req.body;

    // Check if index exists
    if (index < 0 || index >= students.length) {
        return res.status(404).send({
            error: "Student not found"
        });
    }

    // Update student
    students[index] = {
        ...students[index],
        ...updateStudentData
    };

    res.send(students[index]);
});


// DELETE - Delete a student
app.delete("/students/:index", (req, res) => {
    const index = Number(req.params.index);

    // Check if index exists
    if (index < 0 || index >= students.length) {
        return res.status(404).send({
            error: "Student not found"
        });
    }

    // Delete student
    const [deletedStudent] = students.splice(index, 1);

    res.send(deletedStudent);
});


// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});