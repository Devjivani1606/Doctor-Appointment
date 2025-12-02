console.log('Starting server...');

const express = require('express');
const app = express();
const PORT = 5000;

console.log('Express loaded');

app.get('/', (req, res) => {
    console.log('Root route hit');
    res.send('Test server is working!');
});

app.listen(PORT, () => {
    console.log('✅ Test server running on port', PORT);
});

console.log('Server setup complete');