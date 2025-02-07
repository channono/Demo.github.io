
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'admin')));

// Routes
app.get('/admin/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

app.post('/admin/blog-posts', (req, res) => {
    const { title, content, author, date, tags } = req.body;

    // Here you would typically save the new blog post to a database
    // For this example, we'll just log the post data to the console
    console.log('New blog post:', { title, content, author, date, tags });

    // Send a response back to the client
    res.status(201).json({ message: 'New blog post created successfully' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
