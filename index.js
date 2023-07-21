import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import router from './routes/base.routes.js';

const app = express();
app.disable('x-powered-by');

dotenv.config();
// Constants
const PORT = process.env.PORT ?? 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', router);

// Prod/Dev modes
const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client')));

  const indexPath = path.join(__dirname, 'client', 'index.html');

  app.get('*', (req, res) => {
    res.sendFile(indexPath);
  });
}

// Connect to DB & start Server
function start() {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
start();
