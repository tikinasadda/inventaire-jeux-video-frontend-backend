// Dans config/connexion.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Charger les variables d'environnement du fichier .env
dotenv.config();

const ENV = process.env;

// Créer une nouvelle instance de Sequelize pour la connexion
const connexion = new Sequelize(
  ENV.DB_NAME,      // Nom de la BDD
  ENV.DB_USER,      // Utilisateur
  ENV.DB_PASSWORD,  // Mot de passe
  {
    host: ENV.DB_HOST,      // Hôte
    dialect: ENV.DB_DIALECT   // Type de BDD
  }
);

export default connexion;