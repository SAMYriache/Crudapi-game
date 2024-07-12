const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectToDB = require('./config/database');
const characterRoutes = require('./routes/characters');
const logger = require('./middlewares/logger');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(logger);

// Routes
app.use('/characters', characterRoutes);

// Middleware pour gérer les erreurs "non trouvé"
app.use(notFound);

// Middleware pour gérer les erreurs internes du serveur
app.use(errorHandler);

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
async function start() {
    try {
        await connectToDB(process.env.DATABASE_URL);
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log('Error connecting to the database', error);
    }
}

start();
