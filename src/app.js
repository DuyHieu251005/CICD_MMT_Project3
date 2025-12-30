const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Health check API for Docker/Jenkins
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Export for testing
module.exports = app;

// Start server only if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
