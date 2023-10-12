const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 9000;

// Read the JSON file
const questionsData = JSON.parse(fs.readFileSync('questions.json', 'utf-8'));

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // You can specify allowed origins here
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Define a route to serve the questions
app.get('/questions', (req, res) => {
  res.json(questionsData);
});

// Error handling for undefined routes
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// General error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
