const express = require('express');
const path = require('path');

const app = express();
const PORT = 3600;

// Serve static files from public and src directories
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

