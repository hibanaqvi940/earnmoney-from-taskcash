const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Mock database for users
let users = {};

// Route for login/signup
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // Simple user simulation
    if (!users[email]) {
        users[email] = { password, balance: 0 };  // Create new user
    } else if (users[email].password !== password) {
        return res.status(400).json({ message: 'Incorrect password' });
    }

    // Return success
    res.json({ message: 'User logged in successfully' });
});

// Route for updating balance
app.post('/update-balance', (req, res) => {
    const { email, balance } = req.body;
    
    if (!users[email]) {
        return res.status(400).json({ message: 'User not found' });
    }
    
    users[email].balance += balance;
    res.json({ message: 'Balance updated successfully' });
});

// Route for withdrawal (mock PayPal payment)
app.post('/withdraw', (req, res) => {
    const { email, amount } = req.body;
    
    if (!users[email]) {
        return res.status(400).json({ message: 'User not found' });
    }
    
    if (users[email].balance >= amount) {
        users[email].balance -= amount;
        res.json({ message: `Payment of $${amount} processed successfully` });
    } else {
        res.status(400).json({ message: 'Insufficient funds' });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
