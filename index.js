const express = require("express");
const { query } = require("./datadase/conection");
const dotenv = require("dotenv").config();
const cors = require("cors")
const port = process.env.PORT || 1995;;
const app = express();

app.use(express.json()); // Middleware to parse JSON requests
app.use(cors())

const handleError = (err, res) => {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
};

// Get all employees
app.get('/employees', async (req, res) => {
    try {
        console.log(`Received request: ${req.method} ${req.originalUrl}`);
        const sql = `SELECT * FROM employees`;
        const result = await query(sql);
        res.json(result);
    } catch (err) {
        handleError(err, res);
    }
});

// Get employee by ID (URL parameter)
app.get('/employee/:id', (req, res) => {
    const { id } = req.params; // Extract the 'id' from the route parameters
    res.json({ message: `This is the ID: ${id}` });
});


// Get employee by ID (Query parameter)
app.get('/employee', async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ error: "ID is required" });
        }
        const sql = `SELECT * FROM employees WHERE id = ?`;
        const result = await query(sql, [id]);
        if (result.length === 0) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.json(result[0]);
    } catch (err) {
        handleError(err, res);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
