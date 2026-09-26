const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const User = require('./models/User');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Security Headers
app.use(helmet());

// Logging
app.use(morgan('dev'));

// Rate Limiting (General API limiter)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', apiLimiter);

// Specific Auth Limiter (stricter)
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // 100 requests per hour
  message: 'Too many login/signup attempts, please try again later'
});

app.use(cors());
app.use(express.json());

// Expose uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Routes
app.use('/api/auth', authLimiter, require('./routes/authRoutes'));
app.use('/api/resumes', require('./routes/resumeRoutes'));
app.use('/api/resources', require('./routes/resourceRoutes'));
app.use('/api/roadmaps', require('./routes/roadmapRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

app.get('/', (req, res) => {
  res.send('AI Interview Agent & FutureAI API is running.');
});

// Endpoint to get signed URL for ElevenLabs Conversational AI
app.get('/api/elevenlabs/signed-url', async (req, res) => {
  const agentId = req.query.agent_id || process.env.ELEVENLABS_AGENT_ID;

  if (!agentId) {
    return res.status(400).json({ error: 'Agent ID is required' });
  }

  try {
    const response = await axios.get(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
      {
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY
        }
      }
    );
    res.json({ signedUrl: response.data.signed_url });
  } catch (error) {
    console.error('Error fetching signed URL:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate signed URL' });
  }
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  // Seed admin user
  try {
    const adminExists = await User.findOne({ email: 'admin@futureai.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@futureai.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Admin user seeded.');
    }
  } catch (err) {
    console.error('Failed to seed admin:', err.message);
  }
});
