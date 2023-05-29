const express = require('express');
const app = express();
const path = require('path');
const port = 5000;

// Serve the static files from the build folder
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle API routes
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Serve the index.html file if the route is not recognized
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
