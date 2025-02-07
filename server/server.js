const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the website root directory
const websiteDir = path.join(__dirname, '..');
app.use(express.static(websiteDir));

// Ensure messages directory exists
const messagesDir = path.join(__dirname, 'messages');
fs.mkdir(messagesDir, { recursive: true }).catch(console.error);

// API endpoint to receive messages
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Create message object with timestamp
        const messageData = {
            name,
            email,
            subject,
            message,
            timestamp: new Date().toISOString()
        };

        // Save message to a JSON file
        const filename = `${Date.now()}_${name.replace(/[^a-z0-9]/gi, '_')}.json`;
        await fs.writeFile(
            path.join(messagesDir, filename),
            JSON.stringify(messageData, null, 2)
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Failed to save message' });
    }
});

// API endpoint to list all messages
app.get('/api/messages', async (req, res) => {
    try {
        const files = await fs.readdir(messagesDir);
        const messages = await Promise.all(
            files.map(async file => {
                const content = await fs.readFile(path.join(messagesDir, file), 'utf8');
                return JSON.parse(content);
            })
        );

        // Sort messages by timestamp, newest first
        messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        res.json(messages);
    } catch (error) {
        console.error('Error reading messages:', error);
        res.status(500).json({ error: 'Failed to read messages' });
    }
});

// Serve index.html for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(websiteDir, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Website root directory: ${websiteDir}`);
});
