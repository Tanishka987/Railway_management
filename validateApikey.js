require('dotenv').config(); // Load environment variables from .env file

const validateApiKey = (req, res, next) => {
  const apiKey = req.header("x-api-key"); // Retrieve API key from request headers

  // Check if the API key exists and matches the key stored in the environment variable
  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(403).json({ message: "Forbidden: Invalid API Key" });
  }

  // If valid, proceed to the next middleware or route handler
  next();
};

module.exports = validateApiKey;
