/**
 * KOMPLYINT OY Website Backend
 * Minimal support service for public website only.
 * Not related to Todiscope or any other platform.
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8600;

// CORS - allow only the frontend
const corsOptions = {
  origin: 'http://localhost:3600',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Basic request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// POST /contact endpoint
app.post('/contact', (req, res) => {
  try {
    const { email, message } = req.body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return res.status(400).json({
        error: 'Email is required and must be a string'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Validate message
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Message is required and must be a string'
      });
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      return res.status(400).json({
        error: 'Message cannot be empty'
      });
    }

    // Log the contact request (in production, this would send an email)
    console.log('--- Contact Request ---');
    console.log(`Email: ${email}`);
    console.log(`Message: ${trimmedMessage}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log('--- End Contact Request ---');

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Contact request received. We will respond to your inquiry.'
    });

  } catch (error) {
    console.error('Error processing contact request:', error);
    res.status(500).json({
      error: 'An error occurred processing your request'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`KOMPLYINT website backend running on http://localhost:${PORT}`);
});

