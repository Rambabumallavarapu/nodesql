const express = require("express");
const { query } = require("./datadase/conection"); // Import the Promise-based query
const dotenv = require("dotenv").config();

const port = 1995;
const app = express();

app.get('/', async (req, res) => {
    try {
        const sql = `SELECT * FROM employees`; // Fixed typo: "FRoM" ➔ "FROM"
        const result = await query(sql); // Using await with the Promise
        res.json(result);
    } catch (err) {
        console.error("Error fetching data:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
