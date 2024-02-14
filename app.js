const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Built-in middleware for parsing JSON requests

// Routes
const authorRoutes = require('./routes/authorRoutes');
const blogRoutes = require('./routes/blogRoutes');

app.use('/authors', authorRoutes);
app.use('/blogs', blogRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

