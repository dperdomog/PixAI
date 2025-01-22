import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import imageRoutes from './routes/imageRoutes';
import dotenv from 'dotenv';
import path from 'path';
//import bitqueryRoutes from './routes/bitqueryRoutes';

// Load .env.local from root directory
dotenv.config({ path: path.join(__dirname, '../../.env.local') });

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173', // Vite default
  'https://yourdomain.com'  // Add your production domain
];

const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
};

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(cors(corsOptions));
app.use(limiter);
app.use(express.json({ limit: '50mb' }));
app.use('/api/images', imageRoutes);
//app.use('/api/bitquery', bitqueryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 