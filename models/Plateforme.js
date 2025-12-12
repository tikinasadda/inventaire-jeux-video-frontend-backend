// Dans models/Plateforme.js
import { DataTypes } from 'sequelize';
import connexion from '../config/connexion.js';

// Définition du modèle (table) 'Plateforme'
const Plateforme = connexion.define('Plateforme', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

export default Plateforme;