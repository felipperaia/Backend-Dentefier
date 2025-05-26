import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import path from 'path';
import dotenv from 'dotenv';
import axios from 'axios';
import cookieParser from 'cookie-parser';
import casoRoutes from './routes/casoRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import vitimaRoutes from './routes/vitimaRoutes';
import evidenciaRoutes from './routes/evidenciaRoutes';
import { parseCookies } from './middlewares/authMiddleware';


dotenv.config();

const app = express();
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const allowedOrigins = [
  'http://localhost:3000',
  'https://dentefierfront.netlify.app',
];

// Conecta ao MongoDB
connectDB();

// Middlewares
app.use(
  cors({origin: allowedOrigins,
    credentials: true,}));
app.use(cookieParser());
app.use(express.json());
app.use(parseCookies);


// Servir front-end
const publicPath = path.join(__dirname, '../../frontend/public');
app.use(express.static(publicPath));
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Endpoint para expor a chave da API de forma segura
app.get('/api/config', (_req, res) => {
  if (!process.env.GOOGLE_MAPS_API_KEY) {
    return res.status(500).json({ error: 'GOOGLE_MAPS_API_KEY não definida' });
  }
  res.json({ googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY });
});



// Geocodificação reversa via backend
app.get('/api/geocode', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro na geocodificação' });
  }
});

// Rotas de autenticação, usuários, casos e evidências

app.use('/api/casos', casoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/evidencias', evidenciaRoutes);
app.use('/api/vitima', vitimaRoutes);

// Middleware de erro
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Erro interno:', err);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

// Inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));
